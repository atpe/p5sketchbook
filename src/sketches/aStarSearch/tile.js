export default class Tile {
  constructor(index, position, size) {
    this.index = index
    this.position = position
    this.size = size

    this.f = 0
    this.g = 0
    this.h = 0
  }

  getNeighbors(tileMap) {

  }

  draw(sketch) {
    sketch.push()
    sketch.stroke(255, 50)
    sketch.fill([237, 34, 100, 100])
    sketch.rect(this.position.x, this.position.y, this.size.x, this.size.y)
    sketch.pop()
  }
}