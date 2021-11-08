package edu.brown.cs.student.maps;

public class Node {
  private final String id;
  private final Double lat;
  private final Double lon;

  public Node(String id, Double lat, Double lon) {
    this.id = id;
    this.lat = lat;
    this.lon = lon;
  }
}
