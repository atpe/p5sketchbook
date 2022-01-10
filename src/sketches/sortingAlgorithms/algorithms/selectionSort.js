import List from '../list'

// Does not assume unique and/or linear array
export default class SelectionSort extends List {
  constructor(sketchRef) {
    const { clientWidth, clientHeight } = sketchRef.current
    super(clientWidth, clientHeight)
    this.i = 0
    this.j = 0
    this._i = 0
  }

  reset() {
    this.i = 0
    this.j = 0
    this.shuffle()
  }

  sort() {
    // Iterating over width
    if (this.i < List.maxLines) {
      // Keeping or setting the minimum index
      this._i = this._i || this.i
      // Keeping or setting the comparison index
      this.j = this.j || this.i + 1
      // Iterating over width
      if (this.j < List.maxLines) {
        // Setting minimum to lower value if found
        if (this.items[this.j] < this.items[this._i]) {
          this._i = this.j
        }
        // Increment comparison index
        this.j++
      } else {
        // Swap current index with minimum index
        if (this._i !== this.i) {
          [this.items[this.i], this.items[this._i]] = [this.items[this._i], this.items[this.i]]
        }
        // Increment current index
        this.i++
        // Reset other variables
        this.j = undefined
        this._i = undefined
      }
    }
  }

  highlight(sketch) {
    if (this.i === List.maxLines) return
    sketch.push()
    sketch.strokeWeight(2)
    sketch.stroke([100, 255, 100, 100])
    sketch.line(this.i * this.spacing, 0, this.i * this.spacing, this.height)
    sketch.stroke([255, 100, 100, 100])
    sketch.line(this.j * this.spacing, 0, this.j * this.spacing, this.height)
    sketch.stroke([100, 100, 255, 100])
    sketch.line(this._i * this.spacing, 0, this._i * this.spacing, this.height)
    sketch.pop()
  }
}