import { Vector } from "p5";

export default class Algorithm {
  constructor(gridSize, cellSize) {
    this.gridSize = gridSize
    this.cellSize = cellSize
    this.resolution = Vector.div(gridSize, [cellSize.x, cellSize.y])

    this.cells = []

    for (let y = 0; y < this.resolution.y; y++) {
      for (let x = 0; x < this.resolution.x; x++) {
        this.cells.push(false)
      }
    }

    this.setBuffer()
  }

  setBuffer() {
    this.buffer = [...this.cells]
  }

  reset() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i] = false
      this.buffer[i] = false
    }
  }

  handleClick(position) {
    const _x = Math.floor(position.x / this.cellSize.x)
    const _y = Math.floor(position.y / this.cellSize.y)

    const i = _x + _y * this.resolution.x

    this.cells[i] = !this.cells[i]
    this.setBuffer()
  }

  iterate() {
    for (let i = 0; i < this.buffer.length; i++) {
      if (i === 120) console.log(this.buffer[119])
      let neighbors = 0

      const onLeft = i % this.resolution.x === 0
      const onRight = (i + 1) % this.resolution.x === 0
      const onTop = i < this.resolution.x
      const onBottom = i > this.buffer.length - this.resolution.x

      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
          if (
            (x === 0 && y === 0) ||
            (y === -1 && onTop) || (y === 1 && onBottom) ||
            (x === -1 && onLeft) || (x === 1 && onRight)
          ) continue

          const _i = i + x + y * this.resolution.x
          if (this.buffer[_i]) neighbors++
        }
      }

      if (this.buffer[i]) {
        if (neighbors === 2 || neighbors === 3) this.cells[i] = true
        else this.cells[i] = false
      } else {
        if (neighbors === 3) this.cells[i] = true
        else this.cells[i] = false
      }
    }

    this.setBuffer()
  }

  draw(sketch) {
    sketch.stroke(200, 100)
    for (let i = 0; i < this.cells.length; i++) {
      const _x = (i % this.resolution.x)
      const _y = ((i - _x) / this.resolution.x)
      const x = sketch.offset.x + _x * this.cellSize.x
      const y = sketch.offset.y + _y * this.cellSize.y

      sketch.fill(this.cells[i] ? [237, 34, 100, 150] : 120)
      sketch.rect(x, y, this.cellSize.x, this.cellSize.y)
    }
  }
}