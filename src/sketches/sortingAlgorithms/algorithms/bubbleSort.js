import List from '../list'

// Does not assume unique and/or linear array
export default class BubbleSort extends List {
  constructor(sketchRef) {
    const { clientWidth, clientHeight } = sketchRef.current
    super(clientWidth, clientHeight)
    this.i = 1
    this.j = 0
    this.isSorted = false
  }

  reset() {
    this.i = 1
    this.j = 0
    this.isSorted = false
    this.shuffle()
  }

  check() {
    for (let i = 1; i < List.maxLines; i++) {
      if (this.items[i] < this.items[i - 1]) return false
    }
    return true
  }

  sort() {
    // Iterating over width
    if (!this.isSorted && this.i < List.maxLines) {
      // Check if current index is less than previous index
      if (this.items[this.i] < this.items[this.j]) {
        // Swap previous index with current index
        [this.items[this.i], this.items[this.j]] = [this.items[this.j], this.items[this.i]]
      }
      this.i++
      this.j++
    } else {
      this.isSorted = this.check()
      this.i = 1
      this.j = 0
    }
  }

  highlight(sketch) {
    if (this.isSorted) return
    sketch.push()
    sketch.strokeWeight(2)
    // sketch.stroke([100, 255, 100, 100])
    // sketch.line(this.iMax * this.spacing, 0, this.iMax * this.spacing, this.height)
    sketch.stroke([255, 100, 100, 100])
    sketch.line(this.i * this.spacing, 0, this.i * this.spacing, this.height)
    sketch.stroke([100, 100, 255, 100])
    sketch.line(this.j * this.spacing, 0, this.j * this.spacing, this.height)
    sketch.pop()
  }
}