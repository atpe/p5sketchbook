// Local component imports
import List from '../list'

class MaxHeap {
  constructor() {
    this.heap = []
  }

  // @prop {Number} length Length of heap
  get length() { return this.heap.length }

  // Calculates parent's index within heap
  parentIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  // Calculates left child's index within heap
  leftChildIndex(index) {
    return (2 * index + 1)
  }

  // Calculates right child's index within heap
  rightChildIndex(index) {
    return (2 * index + 2)
  }

  // Swaps two items in heap
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }

  // Adds an item to heap
  push(item) {
    this.heap.push(item)
    var index = this.heap.length - 1
    var parent = this.parentIndex(index)
    // Heapify - Move down heap until parent is larger
    while (this.heap[parent] && this.heap[parent] < this.heap[index]) {
      this.swap(parent, index)
      index = this.parentIndex(index)
      parent = this.parentIndex(index)
    }
  }

  // Removes an item from heap
  pop() {
    this.swap(0, this.heap.length - 1)
    var item = this.heap.pop()
    var index = 0
    var leftChild = this.leftChildIndex(index)
    var rightChild = this.rightChildIndex(index)
    // Heapify first item in array to get a correct max heap
    while (this.heap[leftChild] && this.heap[leftChild] > this.heap[index] || this.heap[rightChild] > this.heap[index]) {
      var max = leftChild
      if (this.heap[rightChild] && this.heap[rightChild] > this.heap[max]) {
        max = rightChild
      }
      this.swap(max, index)
      index = max
      leftChild = this.leftChildIndex(max)
      rightChild = this.rightChildIndex(max)
    }
    return item
  }

  // Draws heap to given sketch
  draw(sketch, width, height) {
    const hMax = Math.floor(Math.log(List.max) / Math.log(2))
    const wMax = Math.pow(2, hMax)
    const w = width / (wMax + 1)
    const h = height / (hMax + 1)
    const x = 0
    const y = (height - h * hMax) / 2

    sketch.noStroke()
    sketch.rectMode(sketch.CENTER)
    sketch.textAlign(sketch.CENTER, sketch.CENTER)
    sketch.textSize(w * 0.75)

    let n = 0
    for (let i = 1; i <= this.length; i++) {
      let p = Math.pow(2, n)
      if (i === p) {
        n++
        p *= 2
      }

      const _s = w * (((wMax / p) * 2) * (i % (p / 2)) + (wMax / p))
      const _x = x + _s
      const _y = y + h * (n - 1)

      sketch.stroke(255)
      sketch.strokeWeight(1)
      sketch.fill([237, 34, 100, 55 + (this.heap[i - 1] / height) * 200])
      sketch.ellipse(_x, _y, w * 1.5)
      sketch.noStroke()
      sketch.fill(255)
      sketch.text(Math.round(this.heap[i - 1]), _x, _y)
    }
  }
}

export default class Algorithm extends List {
  constructor(width, height) {
    super(width, height)

    this.heap = new MaxHeap()

    this.i = 0
    this.j = List.max - 1
  }

  // Resets algorithm and reshuffles items
  reset() {
    this.i = 0
    this.j = List.max - 1
    this.heap = new MaxHeap()
    this.shuffle()
  }

  // Sorts items by selection sort
  sort() {
    if (this.i < this.items.length) {
      // Add to heap
      this.heap.push(this.items[this.i])
      this.i++
    } else if (this.j >= 0) {
      // Remove from heap
      this.items[this.j] = this.heap.pop()
      this.j--
    }
  }

  // Highlights key points of algorithm on given sketch
  highlight(sketch) {
    if (this.i === List.max && this.j === 0) return
    sketch.push()
    sketch.strokeWeight(2)
    sketch.stroke([100, 255, 100, 100])
    sketch.line(this.i * this.spacing, 0, this.i * this.spacing, this.height)
    sketch.stroke([255, 100, 100, 100])
    sketch.line(this.j * this.spacing, 0, this.j * this.spacing, this.height)
    sketch.stroke([100, 100, 255, 100])
    sketch.line(this._i * this.spacing, 0, this._i * this.spacing, this.height)

    this.heap.draw(sketch, this.width, this.height)
    sketch.pop()
  }
}