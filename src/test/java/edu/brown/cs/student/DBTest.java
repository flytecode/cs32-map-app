package edu.brown.cs.student;

import edu.brown.cs.student.commandHandlers.pathfinding.MapCommandHandler;
import edu.brown.cs.student.database.DatabaseHandler;
import org.junit.Test;
import org.w3c.dom.Node;

import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;


public class DBTest {

  @Test
  public void understandingFunctionality() {
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
    try {
      ResultSet results = DatabaseHandler.queryLoadedDB("SELECT * FROM node LIMIT 30");
      while (results.next()) {
        System.out.println("ID: " + results.getString("id"));
        System.out.println("lat: " + results.getString("latitude"));
        System.out.println("long: " + results.getString("longitude"));
        Coordinate current = new


        Double x = (lng + 180) * (mapWidth / 360);
// convert from degrees to radians
        var latRad = lat * Math.PI / 180;
// get y value
        var mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
        var y = (mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI));
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
}
