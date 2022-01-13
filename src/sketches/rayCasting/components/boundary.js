/**
 * @module Boundary
 * @author Adam Evans
 */

export default class Boundary {
  /**
   * Creates a boundary
   * 
   * @param {Vector} start Start point of boundary
   * @param {Vector} end End point of boundary
   * @param {Number} weight Size of boundary line
   */
  constructor(start, end, weight) {
    this.start = start
    this.end = end
    this.weight = weight
  }

  get points() {
    return { x1: this.start.x, y1: this.start.y, x2: this.end.x, y2: this.end.y }
  }
}