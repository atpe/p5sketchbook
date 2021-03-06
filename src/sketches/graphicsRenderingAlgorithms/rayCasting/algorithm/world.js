// P5 library imports
import { Vector } from "p5"
// Local component imports
import Box from "./box"
import Caster from "./caster"

export default class World extends Box {
  constructor(center, size) {
    const mag = size.mag()
    const borderWeight = mag / 150
    super(center, size, borderWeight)

    const casterSize = mag / 100
    const viewDistance = mag / 4
    this.caster = new Caster(center, casterSize, viewDistance)

    this.obstacles = []
  }

  get boxes() {
    return [this, ...this.obstacles]
  }

  // Resets the world to its original state
  reset() {
    this.obstacles = []
    this.caster.reposition(this.position)
  }

  // Adds a new obstacle to the world 
  addObstacle(position) {
    const max = Math.max(this.size.x, this.size.y)
    const length = max / ((Math.random() + 1) * 10)
    const size = new Vector(length, length)
    const box = new Box(position, size, 0, this)
    if (!box.contains(this.caster)) this.obstacles.push(box)
  }

  // Calculates whether object is wholly within world bounds
  contains(object) {
    const radius = (object.size ? object.size / 2 : 0) + this.weight / 2
    const { x, y } = object.position ? object.position : object
    const isWithinX = x - radius > this.sides.l && x + radius < this.sides.r
    const isWithinY = y - radius > this.sides.t && y + radius < this.sides.b
    return isWithinX && isWithinY
  }

  // Updates world and its contents
  update(sketch) {
    this.caster.move(sketch)
    this.caster.cast(sketch)
    this.caster.draw(sketch)
    for (const obstacle of this.obstacles) obstacle.draw(sketch)
    this.draw(sketch)
  }

  // Draws the world to the given sketch
  draw(sketch) {
    sketch.push()
    sketch.noFill()
    sketch.strokeWeight(this.weight)
    const { x, y } = this.position
    sketch.rect(x, y, this.size.x, this.size.y)
    sketch.pop()
  }
}