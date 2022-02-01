import { Vector } from "p5"

export default class Boid {
  static color = [237, 34, 100, 150]
  static weight = 4

  static maxVelocity = 3.5
  static maxAcceleration = 0.5
  static maxAlignment = 1.5
  static maxCohesion = 0.5
  static maxSeparation = 1
  static maxCentering = 0.5

  constructor(position) {
    this.acceleration = new Vector()
    this.velocity = Vector.random2D().mult(Boid.maxVelocity)
    this.position = position
  }

  calcAcceleration(neighbors, centers) {
    // Alignment
    const alignment = new Vector()
    if (neighbors.alignment.length) {
      for (const neighbor of neighbors.alignment) {
        alignment.add(neighbor.velocity)
      }

      alignment
        .div(neighbors.alignment.length)
        .setMag(Boid.maxVelocity)
        .sub(this.velocity)
        .mult(Boid.maxAlignment)
    }

    // Cohesion
    const cohesion = new Vector()
    if (neighbors.cohesion.length) {
      for (const neighbor of neighbors.cohesion) {
        cohesion.add(neighbor.position)
      }
      cohesion
        .div(neighbors.cohesion.length)
        .sub(this.position)
        .setMag(Boid.maxVelocity)
        .sub(this.velocity)
        .mult(Boid.maxCohesion)
    }

    // Separation
    const separation = new Vector()
    if (neighbors.separation.length) {
      for (const neighbor of neighbors.separation) {
        const dist = this.position.dist(neighbor.position) || 0.01
        separation.add(Vector
          .sub(this.position, neighbor.position)
          .div(Math.pow(dist, 2))
        )
      }
      separation
        .div(neighbors.separation.length)
        .setMag(Boid.maxVelocity)
        .sub(this.velocity)
        .mult(Boid.maxSeparation)
    }

    // Centering
    const centering = new Vector
    if (centers.length) {
      for (const center of centers) {
        if (center) centering.add(center)
      }
      centering
        .div(centers.length)
        .sub(this.position)
        .setMag(Boid.maxVelocity)
        .sub(this.velocity)
        .mult(Boid.maxCentering)
    }

    // Accumulate effects
    this.acceleration
      .mult(0)
      .add(alignment)
      .add(cohesion)
      .add(separation)
      .add(centering)
      .limit(Boid.maxAcceleration)
  }

  calcPosition() {
    this.velocity
      .add(this.acceleration)
      .setMag(Boid.maxVelocity)
    this.position.add(this.velocity)
  }

  constrain(size) {
    if (this.position.x < 0) this.position.add([size.x, 0])
    if (this.position.y < 0) this.position.add([0, size.y])
    if (this.position.x > size.x) this.position.sub([size.x, 0])
    if (this.position.y > size.y) this.position.sub([0, size.y])
  }

  draw(sketch) {
    sketch.push()
    sketch.point(this.position)
    sketch.pop()
  }
}