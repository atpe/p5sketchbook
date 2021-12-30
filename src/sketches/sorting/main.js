import List from './list'

/** Main sorting sketch function
 *  @param {Object} sketch The p5.js sketch function
 */
export default function sorting(sketch, ref) {
  const { clientWidth, clientHeight } = ref.current

  const list = new List(clientWidth, clientHeight)

  /** Setup function invoked by p5 */
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    list.init()
  }

  /** Draw function invoked by p5 */
  sketch.draw = () => {
    sketch.background(120)
    list.drawTo(sketch)
  }
}