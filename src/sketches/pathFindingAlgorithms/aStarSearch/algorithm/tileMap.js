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
    this.rows = this.mapSize.y / this.tileSize.y

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

  getTileAt(position) {
    const { x, y } = position
    const _x = Math.floor((x - this.border.x / 2) / this.tileSize.x)
    const _y = Math.floor((y - this.border.y / 2) / this.tileSize.y)
    const index = _x + _y * this.columns
    const tile = this.tiles[index]
    if (tile && !tile.blocked) return tile
  }

  createTiles(sketch) {
    this.image = sketch.tileMapImage
    for (let y = this.offset.y; y < this.mapSize.y; y += this.tileSize.y) {
      for (let x = this.offset.x; x < this.mapSize.x; x += this.tileSize.x) {
        const position = new Vector(x, y)
        const noise = Vector.div(position, 50)
        const blocked = sketch.noise(noise.x, noise.y) > 0.5
        const tile = new Tile(this.tiles.length, position, this.tileSize, blocked)
        this.tiles.push(tile)
      }
    }
    for (const tile of this.tiles) {
      tile.getNeighbors(this)
      tile.calcPoints(this)
      tile.draw(this.image)
    }
  }

  draw(sketch) {
    sketch.push()
    sketch.noFill()
    sketch.stroke(255)
    sketch.image(this.image, this.position.x, this.position.y)
    sketch.rect(this.position.x, this.position.y, this.mapSize.x, this.mapSize.y)
    sketch.pop()
  }
}