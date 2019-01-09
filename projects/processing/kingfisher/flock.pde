// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock class
// Does very little, simply manages the ArrayList of all the boids

class Flock {
  ArrayList<Boid> boids;
  color animalColor;

  Flock(color c) {
    boids = new ArrayList<Boid>();
    animalColor = c;
  }

  void run() {
    fill(animalColor);
    for (Boid b : boids) {
      b.run();  // Passing the entire list of boids to each boid individually
    }
  }

  void addBoid(Boid b) {
    boids.add(b);
  }

  ArrayList<Boid> getBoids() {
    return boids;
  }

}