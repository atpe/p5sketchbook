// Local component imports
import Box from "./box"

export default class Quadtree extends Box {
  // Creates a quadtree
  constructor(position, size, capacity) {
    super(position, size)

    this.capacity = capacity

    this.subtrees = []
    this.divided = false

    this.items = []
  }

  // Resets the quadtree to it's initial state
  reset() {
    this.subtrees = []
    this.divided = false
    this.items = []
  }

  // Adds a point to the quadtree
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

  // Divides quadtree and distributes points among subtrees
  divide() {
    // Create a subtree for each quadrant of the area
    for (const { position, size } of this.calcQuadrants()) {
      this.subtrees.push(new Quadtree(position, size, this.capacity))
    }

    itemLoop:
    // Remove all items from this quadree and distribute among subtrees
    while (this.items.length > 0) {
      const item = this.items.pop()
      for (const subtree of this.subtrees) {
        const accepted = subtree.push(item)
        if (accepted) continue itemLoop
      }
    }

    this.divided = true
  }

  // Queries the quadtree to find all points within a given area
  query(box) {
    const _result = []
    let _checks = 0
    if (box.overlaps(this)) {
      if (this.divided) {
        for (const subtree of this.subtrees) {
          const { result, checks } = subtree.query(box)
          _result.push(...result)
          _checks += checks
        }
      } else {
        for (const item of this.items) {
          if (box.contains(item)) _result.push(item)
        }
        _checks += this.items.length
      }
    }
    return { result: _result, checks: _checks }
  }

  // Draw the quadtree to the given sketch
  draw(sketch) {
    sketch.push()
    if (this.divided) {
      for (const subtree of this.subtrees) subtree.draw(sketch)
    } else {
      const { x, y } = this.position
      sketch.strokeWeight(1)
      sketch.stroke(100, 100)
      sketch.noFill()
      sketch.rect(x, y, this.size.x, this.size.y)
    }
    sketch.pop()
  }
}