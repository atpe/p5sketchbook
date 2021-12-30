import List from './list'
import SelectionSort from './algorithms/selectionSort'

/** Main sorting sketch function
 *  @param {Object} sketch The p5.js sketch function
 */
export default function sorting(sketch, ref) {
  const { clientWidth, clientHeight } = ref.current

  const list = new SelectionSort(clientWidth, clientHeight)

  /** Setup function invoked by p5 */
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    list.init()
    list.shuffle()
  }

  /** Draw function invoked by p5 */
  sketch.draw = () => {
    sketch.background(120)
    list.sort()
    list.draw(sketch)
    list.highlight(sketch)
  }
}