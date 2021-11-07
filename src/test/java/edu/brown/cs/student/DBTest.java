package edu.brown.cs.student;

import edu.brown.cs.student.commandHandlers.pathfinding.MapCommandHandler;
import edu.brown.cs.student.database.DatabaseHandler;
import org.junit.Test;
import org.w3c.dom.Node;

import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class DBTest {

  @Test
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
    String statement = "SELECT DISTINCT way.id FROM way "
        + "INNER JOIN (SELECT id FROM node WHERE latitude BETWEEN ? AND ? AND longitude BETWEEN "
        + "? AND ?) as boxNodes ON (way.start=boxNodes.id OR way.end = boxNodes.id) ORDER BY "
        + "way.id ASC;";
    ResultSet results = DatabaseHandler.queryLoadedDB(statement);
    while (results.next()) {
      System.out.println("ID: " + results.getString("id"));
      System.out.println("lat: " + results.getString("latitude"));
      System.out.println("long: " + results.getString("longitude"));
    }
  }
}