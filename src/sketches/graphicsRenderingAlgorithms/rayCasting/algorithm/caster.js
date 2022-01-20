// P5 library imports
import { Vector } from "p5"
// Local component imports
import Ray from "./ray"

export default class Caster {
  static maxRays = 720
  static maxAngle = 2 * Math.PI / Caster.maxRays
  static maxSpeed = 2

  constructor(position, size, viewDistance) {
    this.position = position.copy()
    this.size = size

    this.rays = []

    for (let i = 0; i < Caster.maxRays; i++) {
      const angle = Caster.maxAngle * i
      this.rays[i] = new Ray(this.position, angle, viewDistance)
    }
  }

  // Repositions the caster to the given position
  reposition(position) {
    this.position = position.copy()
    for (const ray of this.rays) ray.reposition(this.position)
  }

  // Casts rays and checks for ray-boundary intersections
  cast(sketch) {
    for (const ray of this.rays) {
      ray.reset()
      for (const box of [sketch.world, ...sketch.world.obstacles]) {
        for (const boundary of box.boundaries) {
          const { x1, y1, x2, y2 } = boundary.points
          ray.calcIntersection(x1, y1, x2, y2)
        }
      }
    }
  }

  // Checks whether a move will cause a collision with world boundaries/obstacles
  isValidMove(move, world) {
    const proposal = { position: Vector.add(this.position, move), size: this.size }
    if (!world.contains(proposal)) return false
    for (const box of world.obstacles) {
      if (box.contains(proposal)) return false
    }
    return true
  }

  // Moves the caster based on keys pressed
  move(sketch) {
    const move = sketch.createVector()
    if (sketch.keyIsDown(87)) { // W
      move.add(0, -1)
      if (!this.isValidMove(move, sketch.world)) move.add(0, +1)
    }
    if (sketch.keyIsDown(65)) { // A
      move.add(-1, 0)
      if (!this.isValidMove(move, sketch.world)) move.add(+1, 0)
    }
    if (sketch.keyIsDown(83)) { // S
      move.add(0, +1)
      if (!this.isValidMove(move, sketch.world)) move.add(0, -1)
    }
    if (sketch.keyIsDown(68)) { // D
      move.add(+1, 0)
      if (!this.isValidMove(move, sketch.world)) move.add(-1, 0)
    }

    const fullMove = move.copy().setMag(Caster.maxSpeed)
    if (this.isValidMove(fullMove, sketch.world)) move.setMag(Caster.maxSpeed)
    this.position.add(move)

    for (const ray of this.rays) ray.reposition(this.position)
  }

  // Draws the caster to the given sketch
  draw(sketch) {
    sketch.push()

    const { x, y } = this.position
    for (const ray of this.rays) ray.draw(sketch)

    sketch.fill([237, 34, 100])
    sketch.noStroke()
    sketch.ellipse(x, y, this.size)

    sketch.pop()
  }
}