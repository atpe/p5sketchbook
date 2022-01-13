/**
 * @module InsertionSort
 * @author Adam Evans
 */

// Local component importsimport List from '../list'

// Does not assume unique and/or linear array
export default class InsertionSort extends List {
  /**
   * Creates a list with insertion sort capability
   * 
   * @param {React.RefObject} sketchRef Element in which sketch is rendered
   */
  constructor(sketchRef) {
    const { clientWidth, clientHeight } = sketchRef.current
    super(clientWidth, clientHeight)
    this.i = 1
    this.j = 0
    this._i = 1
  }

  /** Resets algorithm and reshuffles items */
  reset() {
    this.i = 1
    this._i = this.i
    this.j = this.i - 1
    this.shuffle()
  }

  /** Sorts items by insertion sort */
  sort() {
    // Iterating over width
    if (this._i < List.max) {
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

  /**
   * Highlights key points of algorithm on given sketch
   * 
   * @param {p5} sketch The p5 sketch
   */
  highlight(sketch) {
    if (this._i === List.max) return
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