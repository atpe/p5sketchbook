import { Vector } from "p5"
import Boid from "./boid"

export default class World {
  static maxBoids = 500

  constructor(size) {
    const maxBoids = Math.floor(size.mag() / 16)
    this.maxBoids = Math.min(maxBoids, World.maxBoids)

    this.alignmentDist = size.x < 300 ? 100 : size.mag() / 32
    this.cohesionDist = size.x < 300 ? 200 : size.mag() / 16
    this.separationDist = size.x < 300 ? 100 : size.mag() / 32

    this.size = size
    this.center = Vector.div(this.size, 2)
    this.centers = [false]

    this.boids = []

    for (let i = 0; i < this.maxBoids; i++) {
      const mod = [Math.random(), Math.random()]
      const position = Vector.mult(this.size, mod)
      this.boids[i] = new Boid(position)
    }
  }

  reset() {
    for (let i = 0; i < this.maxBoids; i++) {
      const mod = [Math.random(), Math.random()]
      const position = Vector.mult(this.size, mod)
      this.boids[i] = new Boid(position)
    }
    this.centers = [false]
  }

  update(mouse) {
    for (const boid of this.boids) {
      const neighbors = {
        alignment: [],
        cohesion: [],
        separation: [],
      }
      for (const _boid of this.boids) {
        const dist = boid.position.dist(_boid.position)

        if (dist < this.alignmentDist) {
          neighbors.alignment.push(_boid)
        }
        if (dist < this.cohesionDist) {
          neighbors.cohesion.push(_boid)
        }
        if (dist < this.separationDist) {
          neighbors.separation.push(_boid)
        }
      }

      if (mouse.pressed) this.centers[0] = new Vector(mouse.x, mouse.y)
      else if (this.centers.length === 1) this.centers[0] = this.center
      else (this.centers[0]) = false

      boid.calcAcceleration(neighbors, this.centers)
    }
    for (const boid of this.boids) {
      boid.calcPosition()
      // boid.constrain(this.size)
    }
  }

  addCenter(point) {
    this.centers.push(point)
  }

  removeCenter() {
    if (this.centers.length > 1) this.centers.pop()
  }

  draw(sketch) {
    sketch.push()
    sketch.background(120, 50)

    sketch.stroke(Boid.color)
    sketch.strokeWeight(Boid.weight)
    for (const boid of this.boids) {
      boid.draw(sketch)
    }

    sketch.stroke(255)
    sketch.strokeWeight(5)
    for (const point of this.centers) {
      if (point) sketch.point(point)
    }
    sketch.pop()
  }
}
