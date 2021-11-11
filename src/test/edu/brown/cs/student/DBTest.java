package edu.brown.cs.student;

import com.google.gson.Gson;
import edu.brown.cs.student.commandHandlers.pathfinding.MapCommandHandler;
import edu.brown.cs.student.database.DatabaseHandler;
import edu.brown.cs.student.maps.Way;
import org.junit.Test;
import org.w3c.dom.Node;

import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;


public class DBTest {

  public void understandingFunctionality() throws SQLException {
    String path = "./data/maps/maps.sqlite3";
    try {
      DatabaseHandler.loadDB(path);
    } catch (SQLException e) {
      e.printStackTrace();
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    }
    double latNW = 41.0;
    double latSE = 42.0;
    double lonNW = -71.0;
    double lonSE = -72.0;
    String stmt = "SELECT * FROM way INNER JOIN "
        + "(SELECT id FROM node WHERE latitude BETWEEN " + latNW + " AND " + latSE + " AND "
        + " longitude BETWEEN " + lonSE + " AND " + lonNW + ") as boxNodes ON (way.start=boxNodes.id "
        + "OR way.end = boxNodes.id) ORDER BY way.id ASC LIMIT 10;";
    String fancyStmt = "SELECT way.*, sNode.latitude as startLat, sNode.longitude as startLon, "
        + "eNode.latitude as endLat, eNode.longitude as endLon FROM way "
        + "INNER JOIN (SELECT * FROM node WHERE latitude BETWEEN " + latNW + " AND " + latSE + " AND "
        + "longitude BETWEEN " + lonSE + " and " + lonNW + ") as sNode ON way.start=sNode.id INNER JOIN "
        + "(SELECT * FROM node WHERE latitude BETWEEN " + latNW + " AND " + latSE + " AND longitude "
        + "BETWEEN " + lonSE + " and " + lonNW + ") as eNode ON way.end=eNode.id WHERE way.id LIKE '%1' LIMIT 5;";
    ResultSet results = DatabaseHandler.queryLoadedDB(fancyStmt);
    ArrayList<Way> ways = new ArrayList<>();
    while (results.next()) {
      Way currWay = new Way(results.getString("id"),
          results.getDouble("startLat"),
          results.getDouble("startLon"),
          results.getDouble("endLat"),
          results.getDouble("endLon"),
          results.getString("name"),
          results.getString("type"));
      System.out.println(currWay);
      ways.add(currWay);
    }
    Gson gson = new Gson();
    String waysJson = gson.toJson(ways);
    System.out.println(waysJson);
    double[] coords = {54.0, 42.0};
    Gson GSON = new Gson();
    String test = GSON.toJson(coords);
    System.out.println("test" + test);
  }
}

// SELECT way.*, sNode.latitude as startLat, sNode.longitude as startLon, eNode.latitude as endLat, eNode.longitude as endLon FROM way INNER JOIN node sNode ON way.start=sNode.id INNER JOIN node eNode ON way.end=eNode.id LIMIT 10;
// SELECT way.id FROM way INNER JOIN (SELECT id FROM node WHERE latitude BETWEEN 41 AND 42 AND  longitude BETWEEN -72 AND -71) as boxNodes ON (way.start=boxNodes.id OR way.end = boxNodes.id) ORDER BY way.id ASC LIMIT 30;