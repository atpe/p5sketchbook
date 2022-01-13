/**
 * @module Quadtree
 * @author Adam Evans
 */

// P5 library imports
import { Vector } from "p5"
// Local component imports
import Box from "./box"

export default class Quadtree extends Box {
  /**
   * Creates a quadtree
   * 
   * @param {Vector} position Center point of box
   * @param {Vector} size Size of box
   * @param {Number} capacity Quadtree capacity
   */
  constructor(position, size, capacity) {
    super(position, size)

    this.capacity = capacity

    this.subtrees = []
    this.divided = false

    this.items = []
  }

  reset() {
    this.subtrees = []
    this.divided = false
    this.items = []
  }

  /**
   * Adds a point to the quadtree
   * 
   * @param {Vector} point Point to add to quadtree
   */
  push(point) {
    // Check if point belongs in this quadtree
    if (this.contains(point)) {
      if (this.divided) {
        // If divided, attempt to add point to subtrees
        for (const subtree of this.subtrees) {
          const accepted = subtree.push(point)
          if (accepted) return true
        }
        // Otherwise add to this quadtree
      } else this.items.push(point)
    }
    // Return false if not qithin this quadtree
    else return false

    // If capacity is not exceeded, return that point was accepted
    if (this.items.length <= this.capacity) return true
    // Otherwise, divide into four subtrees
    else this.divide()
  }

  /** Divides quadtree and distributes points among subtrees */
  divide() {
    for (const { position, size } of this.calcQuadrants()) {
      this.subtrees.push(new Quadtree(position, size, this.capacity))
    }

    itemLoop:
    while (this.items.length > 0) {
      const item = this.items.pop()
      for (const subtree of this.subtrees) {
        const accepted = subtree.push(item)
        if (accepted) continue itemLoop
      }
    }

    this.divided = true
  }

  /**
 * Draw the quadtree to the given sketch
 * 
 * @param {p5} sketch The p5.js sketch
 */
  draw(sketch) {
    sketch.push()
    if (this.divided) {
      for (const subtree of this.subtrees) subtree.draw(sketch)
    } else {
      const { x, y } = this.position
      sketch.stroke(0, 100)
      sketch.noFill()
      sketch.rect(x, y, this.size.x, this.size.y)
    }
    sketch.pop()
  }
}