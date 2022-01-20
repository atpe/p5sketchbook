const LEFT = 0
const RIGHT = 1

export default class MinHeap {
  constructor(selector) {
    this.nodes = [null]
    this.selector = selector
  }

  get length() { return this.nodes.length }

  get min() { return this.nodes[1] }

  set min(node) { this.nodes[1] = node }

  includes(node) { return this.nodes.includes(node) }

  getValue(index) { return index < this.length && index !== 0 ? this.selector(this.nodes[index]) : undefined }

  getParentIndex(index) { return Math.floor(index / 2) }

  getChildIndex(index, side) { return index * 2 + side }

  swapNodes(index, _index) {
    [this.nodes[index], this.nodes[_index]] = [this.nodes[_index], this.nodes[index]]
  }

  push(node) {
    this.nodes.push(node)

    if (this.length > 1) {
      let currentIndex = this.length - 1
      let parentIndex = this.getParentIndex(currentIndex)
      let currentValue = this.getValue(currentIndex)
      let parentValue = this.getValue(parentIndex)

      while (currentIndex > 1 && parentValue > currentValue) {
        this.swapNodes(currentIndex, parentIndex)
        currentIndex = parentIndex
        parentIndex = this.getParentIndex(currentIndex)
        currentValue = this.getValue(currentIndex)
        parentValue = this.getValue(parentIndex)
      }
    }
  }

  pop() {
    const min = this.min

    if (this.length > 2) {
      this.min = this.nodes.pop()
      if (this.length === 3) {
        if (this.nodes[1] > this.nodes[2]) {
          this.swapNodes(1, 2)
        }
        return min
      }

      let currentIndex = 1
      let leftChildIndex = this.getChildIndex(currentIndex, LEFT)
      let rightChildIndex = this.getChildIndex(currentIndex, RIGHT)
      let currentValue = this.getValue(currentIndex)
      let leftChildValue = this.getValue(leftChildIndex)
      let rightChildValue = this.getValue(rightChildIndex)

      let currentHasChildren = this.nodes[leftChildIndex] && this.nodes[rightChildIndex]
      let currentHasLowerChild = currentValue > leftChildValue || currentValue > rightChildValue
      while (currentHasChildren && currentHasLowerChild) {
        if (leftChildValue < rightChildValue) {
          this.swapNodes(currentIndex, leftChildIndex)
          currentIndex = leftChildIndex
        } else {
          this.swapNodes(currentIndex, rightChildIndex)
          currentIndex = rightChildIndex
        }

        leftChildIndex = this.getChildIndex(currentIndex, LEFT)
        rightChildIndex = this.getChildIndex(currentIndex, RIGHT)
        currentValue = this.getValue(currentIndex)
        leftChildValue = this.getValue(leftChildIndex)
        rightChildValue = this.getValue(rightChildIndex)

        currentHasChildren = this.nodes[leftChildIndex] && this.nodes[rightChildIndex]
        currentHasLowerChild = currentValue > leftChildValue || currentValue > rightChildValue
      }
    } else if (this.nodes.length === 2) this.nodes.pop()
    else return null

    return min
  }

  heapify() {
    const heap = this.nodes
    this.nodes = []
    for (const node of heap) this.push(node)
  }
}