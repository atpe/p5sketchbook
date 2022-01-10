import List from '../list'

// Does not assume unique and/or linear array
export default class InsertionSort extends List {
  constructor(sketchRef) {
    const { clientWidth, clientHeight } = sketchRef.current
    super(clientWidth, clientHeight)
    this.i = 1
    this.j = 0
    this._i = 1
  }

  reset() {
    this.i = 1
    this._i = this.i
    this.j = this.i - 1
    this.shuffle()
  }

  sort() {
    // Iterating over width
    if (this._i < List.maxLines) {
      // Check if current index is less than previous index
      if (this.items[this._i] < this.items[this.j]) {
        // Swap previous index with current index
        [this.items[this._i], this.items[this.j]] = [this.items[this.j], this.items[this._i]]
        // Decrease indices to check previous
        this._i--
        this.j--
        // Keep decreaaing until current is in correct position
        if (this.j >= 0) return
      }
      // Increase max index and reset other indices
      this.i++
      this._i = this.i
      this.j = this.i - 1
    }
  }

  highlight(sketch) {
    if (this._i === List.maxLines) return
    sketch.push()
    sketch.strokeWeight(2)
    sketch.stroke([100, 255, 100, 100])
    sketch.line(this.i * this.spacing, 0, this.i * this.spacing, this.height)
    sketch.stroke([255, 100, 100, 100])
    sketch.line(this._i * this.spacing, 0, this._i * this.spacing, this.height)
    sketch.stroke([100, 100, 255, 100])
    sketch.line(this.j * this.spacing, 0, this.j * this.spacing, this.height)
    sketch.pop()
  }
}