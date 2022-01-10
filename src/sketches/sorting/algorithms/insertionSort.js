import List from '../list'

// Does not assume unique and/or linear array
export default class InsertionSort extends List {
  constructor(sketchRef) {
    const { clientWidth, clientHeight } = sketchRef.current
    super(clientWidth, clientHeight)
    this.iMax = 1
    this.i = this.iMax
    this.j = this.iMax - 1
  }

  sort() {
    // Iterating over width
    if (this.i < List.maxLines) {
      // Check if current index is less than previous index
      if (this.items[this.i] < this.items[this.j]) {
        // Swap previous index with current index
        [this.items[this.i], this.items[this.j]] = [this.items[this.j], this.items[this.i]]
        // Decrease indices to check previous
        this.i--
        this.j--
        // Keep decreaaing until current is in correct position
        if (this.j >= 0) return
      }
      // Increase max index and reset other indices
      this.iMax++
      this.i = this.iMax
      this.j = this.iMax - 1
    }
  }

  highlight(sketch) {
    sketch.push()
    sketch.strokeWeight(2)
    sketch.stroke([100, 255, 100, 100])
    sketch.line(this.iMax * this.spacing, 0, this.iMax * this.spacing, this.height)
    sketch.stroke([255, 100, 100, 100])
    sketch.line(this.i * this.spacing, 0, this.i * this.spacing, this.height)
    sketch.stroke([100, 100, 255, 100])
    sketch.line(this.j * this.spacing, 0, this.j * this.spacing, this.height)
    sketch.pop()
  }
}