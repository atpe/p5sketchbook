import { Vector } from "p5"
import Tile from "./tile"

export default class TileMap {
  constructor(position, mapSize, tileSize) {
    this.position = position
    this.tileSize = tileSize

    this.border = Vector.rem(mapSize, tileSize)
    this.mapSize = Vector.sub(mapSize, this.border)
    this.offset = Vector.add(tileSize, this.border).div(2)
    this.columns = this.mapSize.x / this.tileSize.x

    this.tiles = []
  }

  get start() { return this.tiles[0] }
  get end() { return this.tiles[this.tiles.length - 1] }

  getRandomTile(sketch) {
    let tile = undefined
    while (!tile || tile.blocked) {
      const i = Math.floor(sketch.random() * this.tiles.length)
      tile = this.tiles[i]
    }
    return tile
  }

  createTiles(sketch) {
    this.image = sketch.tileMapImage
    for (let y = this.offset.y; y < this.mapSize.y; y += this.tileSize.y) {
      for (let x = this.offset.x; x < this.mapSize.x; x += this.tileSize.x) {
        const position = new Vector(x, y)
        const noise = Vector.div(position, [this.mapSize.x, this.mapSize.y]).mult(Math.sqrt(this.mapSize.mag()))
        const tile = new Tile(this.tiles.length, position, this.tileSize, sketch.noise(noise.x, noise.y) > 0.5)
        this.tiles.push(tile)
      }
    }
    for (const tile of this.tiles) {
      tile.getNeighbors(this)
      tile.draw(this.image)
    }
  }

  draw(sketch) {
    sketch.push()
    sketch.noFill()
    sketch.stroke(255)
    sketch.rect(this.position.x, this.position.y, this.mapSize.x, this.mapSize.y)
    sketch.image(this.image, 0, 0, this.mapSize.x, this.mapSize.y)
    sketch.pop()
  }
}