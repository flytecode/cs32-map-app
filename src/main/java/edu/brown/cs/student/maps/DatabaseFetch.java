package edu.brown.cs.student.maps;

import edu.brown.cs.student.database.DatabaseHandler;

import java.io.FileNotFoundException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DatabaseFetch {

  public static List<Way> fetchWays(double latNW, double lonNW, double latSE, double lonSE)
      throws SQLException, FileNotFoundException, ClassNotFoundException {
    // Load DB
    DatabaseHandler.loadDB("./data/maps/maps.sqlite3");
    // Create Query String
    String fancyStmt = "SELECT way.*, sNode.latitude as startLat, sNode.longitude as startLon, "
    + "eNode.latitude as endLat, eNode.longitude as endLon FROM way "
    + "INNER JOIN (SELECT * FROM node WHERE latitude BETWEEN " + latNW + " AND " + latSE + " AND "
    + "longitude BETWEEN " + lonSE + " and " + lonNW + ") as sNode ON way.start=sNode.id INNER JOIN "
    + "(SELECT * FROM node WHERE latitude BETWEEN " + latNW + " AND " + latSE + " AND longitude "
    + "BETWEEN " + lonSE + " and " + lonNW + ") as eNode ON way.end=eNode.id WHERE way.id LIKE '%1';";
    // Query Results
    ResultSet results = DatabaseHandler.queryLoadedDB(fancyStmt);
    ArrayList<Way> ways = new ArrayList<>();
    // Add each Way to ways ArrayList
    while (results.next()) {
      Way currWay = new Way(results.getString("id"),
          results.getDouble("startLat"),
          results.getDouble("startLon"),
          results.getDouble("endLat"),
          results.getDouble("endLon"),
          results.getString("name"),
          results.getString("type"));
      ways.add(currWay);
    }
    return ways;
  }
}



//    String stmt = "SELECT * FROM way INNER JOIN "
//        + "(SELECT id FROM node WHERE latitude BETWEEN " + latNW + " AND " + latSE + " AND "
//        + " longitude BETWEEN " + lonSE + " AND " + lonNW + ") as boxNodes ON (way.start=boxNodes.id "
//        + "OR way.end = boxNodes.id) ORDER BY way.id ASC;";