import { Vector } from "p5"
import Tile from "./tile"

export default class TileMap {
  constructor(position, mapSize, tileSize) {
    this.position = position
    this.tileSize = tileSize

    this.border = Vector.rem(mapSize, tileSize)
    this.mapSize = Vector.sub(mapSize, this.border)
    this.offset = Vector.add(tileSize, this.border).div(2)

    this.tiles = []
    this.createTiles()
  }

  createTiles() {
    console.log(this)
    for (let y = this.offset.y; y < this.mapSize.y; y += this.tileSize.y) {
      for (let x = this.offset.x; x < this.mapSize.x; x += this.tileSize.x) {
        const position = new Vector(x, y)
        const tile = new Tile(this.tiles.length, position, this.tileSize)
        this.tiles.push(tile)
      }
    }
  }

  draw(sketch) {
    sketch.push()
    for (const tile of this.tiles) tile.draw(sketch)
    sketch.noFill()
    sketch.stroke(255)
    sketch.rect(this.position.x, this.position.y, this.mapSize.x, this.mapSize.y)
    sketch.pop()
  }
}