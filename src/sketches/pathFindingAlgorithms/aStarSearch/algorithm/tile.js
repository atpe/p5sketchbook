import { Vector } from "p5"

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
      for (let i = -1; i <= 1; i++) {
        if (i === 0 && j === 0) continue

        const offTop = j === -1 && this.index < tileMap.columns
        const offBottom = j === 1 && this.index === tileMap.columns - 1
        const offLeft = i === -1 && this.index % tileMap.columns === 0
        const offRight = i === 1 && this.index % tileMap.columns === tileMap.columns - 1
        if (offTop || offBottom || offLeft || offRight) continue

        const index = this.index + i + j * tileMap.columns
        if (index < 0 || index >= tileMap.tiles.length) continue
        else this.neighbors.push(tileMap.tiles[index])
      }
    }
  }

  calcPoints(tileMap) {
    const directionKeys = ['tl', 'tc', 'tr', 'cl', 'cr', 'bl', 'bc', 'br']

    const mods = {}
    const blocked = {}

    const t = this.index < tileMap.columns
    const l = this.index % tileMap.columns === 0
    const r = this.index % tileMap.columns === tileMap.columns - 1
    const b = this.index > tileMap.columns * (tileMap.rows - 1) - 1

    const off = {
      tl: t || l,
      tc: t,
      tr: t || r,
      cl: l,
      cr: r,
      bl: b || l,
      bc: b,
      br: b || r,
    }

    let key = 0
    for (let j = -1; j <= 1; j++) {
      for (let i = -1; i <= 1; i++) {
        if (i === 0 && j === 0) continue
        const index = this.index + i + j * tileMap.columns
        const dir = directionKeys[key]
        mods[dir] = [i, j]
        blocked[dir] = off[dir] || tileMap.tiles[index]?.blocked
        key++
      }
    }

    const points = []
    const position = this.position
    const size = this.size
    function addPoint(mod) {
      points.push(Vector.add(position, Vector.mult(Vector.div(size, 2), mod)))
    }

    if (this.blocked) {
      if (blocked.tc) { if (!blocked.cl) addPoint(mods.tl); addPoint(mods.tr) } else addPoint(mods.tc)
      if (blocked.cr) { if (!blocked.tc) addPoint(mods.tr); addPoint(mods.br) } else addPoint(mods.cr)
      if (blocked.bc) { if (!blocked.cr) addPoint(mods.br); addPoint(mods.bl) } else addPoint(mods.bc)
      if (blocked.cl) { if (!blocked.bc) addPoint(mods.bl); addPoint(mods.tl) } else addPoint(mods.cl)
    } else {
      const completelyUnbounded = !(blocked.tc || blocked.cr || blocked.bc || blocked.cl)
      const horizontallyUnbounded = !(blocked.tc || blocked.bc)
      const verticallyUnbounded = !(blocked.cl || blocked.cr)
      this.noDraw = completelyUnbounded || horizontallyUnbounded || verticallyUnbounded
      if (this.noDraw) return

      const cornered = {
        tl: blocked.tl && blocked.tc && blocked.cl,
        tr: blocked.tc && blocked.tr && blocked.cr,
        bl: blocked.cl && blocked.bc && blocked.bl,
        br: blocked.cr && blocked.br && blocked.bc,
      }

      if (cornered.tl) { addPoint(mods.tl); addPoint(mods.tc); addPoint(mods.cl) }
      if (cornered.tr) { addPoint(mods.tc); addPoint(mods.tr); addPoint(mods.cr) }
      if (cornered.bl) { addPoint(mods.cl); addPoint(mods.bc); addPoint(mods.bl) }
      if (cornered.br) { addPoint(mods.cr); addPoint(mods.br); addPoint(mods.bc) }
    }

    this.points = points
  }


  close() { this.closed = true }

  setPrevious(tile) { this.previous = tile }

  calcHeuristic(end) {
    this.h = this.position.dist(end.position)
    this.f = this.g + this.h
  }

  draw(sketch) {
    if (this.noDraw) return

    sketch.push()
    sketch.noStroke()
    sketch.fill(50)

    sketch.beginShape(this.blocked ? null : sketch.TRIANGLES)
    for (const point of this.points) {
      sketch.vertex(point.x, point.y)
    }
    sketch.endShape(this.blocked ? sketch.CLOSE : null)
    sketch.pop()
  }

  highlight(sketch, color) {
    sketch.push()
    sketch.strokeWeight(Math.sqrt(this.size.mag()))
    sketch.stroke(color)
    sketch.point(this.position)
    sketch.pop()
  }
}