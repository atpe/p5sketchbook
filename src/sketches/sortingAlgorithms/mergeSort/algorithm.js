// Local component imports
import List from '../list'

export default class Algorithm extends List {
  constructor(width, height) {
    super(width, height)

    this.isSorted = false

    this.sorter = this.Sorter(0, this.items.length)
    this._items = Array(this.items.length).fill(-1)

    this.l = 0
    this.m = 1
    this.h = 2
  }

  // Creates new merge sort generator function
  * Sorter(l, h) {
    if (h - l > 1) {
      const m = Math.floor((l + h) / 2)
      yield* this.Sorter(l, m)
      yield* this.Sorter(m, h)
      yield* this.Merger(l, m, h)
    }
  }

  // Merges sorted sections of items array
  * Merger(l, m, h) {
    this.l = l
    this.m = m
    this.h = h
    let i0 = l
    let i1 = l
    let i2 = m
    while (i1 < m && i2 < h) {
      if (this.items[i1] < this.items[i2]) {
        this._items[i0] = this.items[i1]
        i1++
      } else {
        this._items[i0] = this.items[i2]
        i2++
      }
      i0++
      yield
    }
    if (h - i2 < m - i1) {
      for (let i = i1; i < m; i++) {
        this._items[i0] = this.items[i]
        i0++
      }
    } else {
      for (let i = i2; i < h; i++) {
        this._items[i0] = this.items[i]
        i0++
      }
    }
    yield
    for (let i = l; i < h; i++) {
      this.items[i] = this._items[i]
    }
    yield
  }

  // Resets algorithm and reshuffles items
  reset() {
    this.shuffle()
    this.isSorted = false
    this.sorter = this.Sorter(0, this.items.length)
    this._items = new Array(this.items.length).fill(-1)
    this.l = 0
    this.m = 1
    this.h = 2
  }

  // Sorts items by selection sort
  sort() {
    if (!this.isSorted) {
      const val = this.sorter.next()
      if (val.done) this.isSorted = true
    }
  }

  // Highlights key points of algorithm on given sketch
  highlight(sketch) {
    if (this.isSorted) return

    sketch.push()

    for (let i = 0; i < this._items.length; i++) {
      if (this.items[i] < 0) continue

      const _y = this._items[i]
      const _x = i * this.spacing
      sketch.noStroke()
      sketch.fill([155 + (_y / this.height) * 100, 100])
      sketch.rect(_x, this.height - _y, this.spacing, _y)
    }

    sketch.strokeWeight(2)
    sketch.stroke([100, 255, 100, 100])
    sketch.line(this.l * this.spacing, 0, this.l * this.spacing, this.height)
    sketch.stroke([255, 100, 100, 100])
    sketch.line(this.m * this.spacing, 0, this.m * this.spacing, this.height)
    sketch.stroke([100, 100, 255, 100])
    sketch.line(this.h * this.spacing, 0, this.h * this.spacing, this.height)

    sketch.pop()
  }
}