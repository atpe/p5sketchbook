export default class Tile {
  constructor(index, position, size, blocked) {
    this.index = index
    this.position = position
    this.size = size
    this.blocked = blocked

    this.weight = this.size.mag() / Math.SQRT2

    this.neighbors = []
    this.points = []

    this.f = 0
    this.g = 0
    this.h = 0

    this.closed = false

  }

  get valid() {
    return !this.closed && !this.blocked
  }


  getNeighbors(tileMap) {
    for (let j = -1; j <= 1; j++) {
      const offTop = j === -1 && this.index < tileMap.columns
      const offBottom = j === 1 && this.index === tileMap.columns - 1
      if (offTop || offBottom) continue
      for (let i = -1; i <= 1; i++) {
        const offLeft = i === -1 && this.index % tileMap.columns === 0
        const onRightEdge = i === 1 && this.index % tileMap.columns === tileMap.columns - 1
        if (offLeft || onRightEdge) continue
        if (i === 0 && j === 0) continue
        const index = this.index + i + j * tileMap.columns
        if (index < 0 || index >= tileMap.tiles.length) continue
        else this.neighbors.push(tileMap.tiles[index])
      }
    }
  }

  close() { this.closed = true }

  setPrevious(tile) { this.previous = tile }

  calcHeuristic(end) {
    this.h = this.position.dist(end.position)
    this.f = this.g + this.h
  }

  draw(sketch) {
    if (!this.blocked) return
    sketch.push()
    sketch.stroke(50)
    sketch.strokeWeight(this.weight)
    sketch.point(this.position)

    // sketch.noStroke()
    // sketch.fill(0)
    // sketch.textAlign(sketch.CENTER, sketch.CENTER)
    // sketch.text(this.f.toFixed(2), this.position.x, this.position.y)
    sketch.pop()
  }
}