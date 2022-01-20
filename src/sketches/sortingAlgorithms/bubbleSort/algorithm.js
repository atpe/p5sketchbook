// Local component imports
import List from '../list'

export default class Algorithm extends List {
  constructor(width, height) {
    super(width, height)
    this.i = 1
    this.j = 0
    this.isSorted = false
  }

  // Resets algorithm and reshuffles items
  reset() {
    this.i = 1
    this.j = 0
    this.isSorted = false
    this.shuffle()
  }

  // Checks if algorithm is complete
  check() {
    for (let i = 1; i < List.max; i++) {
      if (this.items[i] < this.items[i - 1]) return false
    }
    return true
  }

  // Sorts items by insertion sort
  sort() {
    // Iterating over width
    if (!this.isSorted && this.i < List.max) {
      // Check if current index is less than previous index
      if (this.items[this.i] < this.items[this.j]) {
        // Swap previous index with current index
        [this.items[this.i], this.items[this.j]] = [this.items[this.j], this.items[this.i]]
      }
      // Move to next pair
      this.i++
      this.j++
    } else {
      // Return to start if not sorted
      this.isSorted = this.check()
      this.i = 1
      this.j = 0
    }
  }

  // Highlights key points of algorithm on given sketch
  highlight(sketch) {
    if (this.isSorted) return
    sketch.push()
    sketch.strokeWeight(2)
    sketch.stroke([255, 100, 100, 100])
    sketch.line(this.i * this.spacing, 0, this.i * this.spacing, this.height)
    sketch.stroke([100, 100, 255, 100])
    sketch.line(this.j * this.spacing, 0, this.j * this.spacing, this.height)
    sketch.pop()
  }
}