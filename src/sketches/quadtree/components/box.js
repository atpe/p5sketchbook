/**
 * @module Box
 * @author Adam Evans
 */

// P5 library imports
import { Vector } from "p5"


export default class Box {
  /**
   * Creates a box
   * 
   * @param {Vector} position Center point of box
   * @param {Vector} size Size of box
   */
  constructor(position, size) {
    this.position = position.copy()
    this.size = size.copy()

    this.quarter = this.calcQuarterSize()
    this.sides = this.calcSides()
  }

  /**
   * Calculates quarter the size of box
   * 
   * @returns {Vector} Quarter size of box
   */
  calcQuarterSize() {
    return Vector.div(this.size, 2)
  }

  /**
   * Calculates side position values for box
   * @returns {Object}
   */
  calcSides() {
    return {
      t: this.position.y - this.quarter.y,
      r: this.position.x + this.quarter.x,
      b: this.position.y + this.quarter.y,
      l: this.position.x - this.quarter.x,
    }
  }

  /**
   * Calculates quadrants for box
   * 
   * @returns {Object[]} Array of quadrant objects
   */
  calcQuadrants() {
    return [
      {
        position: Vector.add(this.position, [-this.quarter.x / 2, -this.quarter.y / 2]),
        size: this.quarter.copy()
      },
      {
        position: Vector.add(this.position, [+this.quarter.x / 2, -this.quarter.y / 2]),
        size: this.quarter.copy()
      },
      {
        position: Vector.add(this.position, [-this.quarter.x / 2, +this.quarter.y / 2]),
        size: this.quarter.copy()
      },
      {
        position: Vector.add(this.position, [+this.quarter.x / 2, +this.quarter.y / 2]),
        size: this.quarter.copy()
      },
    ]
  }

  /**
   * Calculates if an point is within box
   * 
   * @param {Vector} point Either a vector or an point with position and size properties
   * @returns {Boolean} True if point is at all within world bounds
   */
  contains(point) {
    const { x, y } = point
    const isWithinX = x > this.sides.l && x < this.sides.r
    const isWithinY = y > this.sides.t && y < this.sides.b
    return isWithinX && isWithinY
  }

  overlaps(box) {
    const left = this.sides.r <= box.sides.l
    const right = this.sides.l >= box.sides.r
    const above = this.sides.b <= box.sides.t
    const below = this.sides.t >= box.sides.b

    return !(left || right || above || below)
  }

  /**
   * Moves the box based on keys pressed
   * 
   * @param {p5} sketch The p5.js sketch
   */
  move(sketch) {
    const move = sketch.createVector()
    if (sketch.keyIsDown(87)) { // W
      move.add(0, -1)
    }
    if (sketch.keyIsDown(65)) { // A
      move.add(-1, 0)
    }
    if (sketch.keyIsDown(83)) { // S
      move.add(0, +1)
    }
    if (sketch.keyIsDown(68)) { // D
      move.add(+1, 0)
    }
    this.position.add(move)

    if (sketch.quadtree.contains(this.position)) {
      this.quarter = this.calcQuarterSize()
      this.sides = this.calcSides()
    } else {
      this.position.sub(move)
    }
  }

  /**
   * Draw the box to the given sketch
   * 
   * @param {p5} sketch The p5.js sketch
   */
  draw(sketch) {
    sketch.push()
    sketch.noStroke()
    sketch.fill([237, 34, 100, 50])
    let y, h
    if (this.sides.t <= 0) {
      y = this.position.y - this.sides.t / 2
      h = this.size.y + this.sides.t
    }
    if (this.sides.b >= sketch.quadtree.size.y) {
      y = this.position.y + (sketch.quadtree.size.y - this.sides.b) / 2
      h = this.size.y + (sketch.quadtree.size.y - this.sides.b)
    }
    sketch.rect(this.position.x, y || this.position.y, this.size.x, h || this.size.y)
    sketch.pop()
  }
}