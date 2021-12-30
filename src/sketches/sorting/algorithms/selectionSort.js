import List from '../list'

export default class SelectionSort extends List {
  constructor(width, height) {
    super(width, height)

    this.status = 'SELECTING'

    this.i = 0
  }

  select() {
    // Iterating over width
    if (this.i < this.width) {
      // Keeping or setting the minimum index
      this.iMin = this.iMin || this.i
      // Keeping or setting the comparison index
      this.j = this.j || this.i + 1
      // Iterating over width
      if (this.j < this.width) {
        // Setting minimum to lower value if found
        if (this.items[this.j] < this.items[this.iMin]) {
          this.iMin = this.j
        }
        // Increment comparison index
        this.j++
      } else {
        this.j = undefined
        // Swap current index with minimum index
        if (this.iMin != this.i) {
          [this.items[this.i], this.items[this.iMin]] = [this.items[this.iMin], this.items[this.i]]
        }
        this.i++
        this.iMin = undefined
      }
    }
  }

  highlight(sketch) {
    sketch.push()
    sketch.strokeWeight(2)
    sketch.stroke([100, 255, 100, 100])
    sketch.line(this.i, 0, this.i, this.height)
    sketch.stroke([255, 100, 100, 100])
    sketch.line(this.j, 0, this.j, this.height)
    sketch.stroke([100, 100, 255, 100])
    sketch.line(this.iMin, 0, this.iMin, this.height)
    sketch.pop()
  }

  sort() {
    switch (this.status) {
      case 'SELECTING':
        this.select()
        break
      default: break
    }
  }
}