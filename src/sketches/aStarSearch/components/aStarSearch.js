export default class AStarSearch {
  constructor(tileMap) {
    this.tileMap = tileMap
  }

  init(start, end) {
    this.start = start
    this.current = start
    this.end = end
    this.open = []
    this.closed = []
    this.path = []

    this.start.g = 0
    this.start.calcHeuristic(end)

    this.open.push(start)

    this.pathFound = false
    this.pathBuilt = false
  }

  buildPath() {
    if (this.current === this.start) return this.pathBuilt = true
    this.path.push(this.current)
    this.current = this.current.previous
  }

  iterate() {
    // While not complete and there are tiles left to search
    if (!this.pathBuilt && this.open.length > 0) {
      // If end is reached, build the path until complete
      if (this.current === this.end) this.pathFound = true
      if (this.pathFound && !this.pathBuilt) return this.buildPath()

      // Remove current from open set and add to closed set
      this.current = this.open.pop()
      this.current.close()
      this.closed.push(this.current)

      // Iterate over current tile's neighbors
      for (const neighbor of this.current.neighbors) {
        // Skip if not a vaild tile
        if (!neighbor.valid) continue
        // Calculate the tentative g value
        const _g = this.current.g + this.current.position.dist(neighbor.position)

        // Check for better path
        const index = this.open.indexOf(neighbor)
        if (index >= 0) {
          // Skip neighbors to which there exists a better path
          if (_g < neighbor.g) {
            // Set f, g, and h values for neighbor
            neighbor.g = _g
            neighbor.calcHeuristic(this.end)
            // Set the previous tile for neighbor
            neighbor.setPrevious(this.current)
          }
        } else {
          // Add neighbor to end of open set
          this.open.push(neighbor)
          // Set f, g, and h values for neighbor
          neighbor.g = _g
          neighbor.calcHeuristic(this.end)
          // Set the previous tile for neighbor
          neighbor.setPrevious(this.current)
        }
      }
      // Sort open array into descending order of f values
      this.open.sort((a, b) => { return b.f - a.f })
      // No valid solution
    } else return
  }

  draw(sketch) {
    sketch.strokeWeight(this.tileMap.tileSize.mag() / 2)
    for (const tile of this.closed) {
      sketch.stroke(0, 50)
      sketch.point(tile.position)
    }
    for (const tile of this.open) {
      if (!tile) continue
      sketch.stroke(255, 50)
      sketch.point(tile.position)
    }

    sketch.stroke(255, 50)
    sketch.point(this.current.position)

    for (const tile of [this.start, this.end, ...this.path]) {
      sketch.stroke([237, 34, 100])
      sketch.point(tile.position)
    }
  }
}