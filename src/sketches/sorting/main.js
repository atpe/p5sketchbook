import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

import SelectionSort from './algorithms/selectionSort'

export function sortingActions(actions) {
  return (
    <CardActions>
      <Button onClick={actions.start}>Start</Button>
      <Button onClick={actions.pause}>Pause</Button>
    </CardActions >
  )
}

/** Main sorting sketch function
 *  @param {Object} sketch The p5.js sketch function
 */
export function sortingSketch(sketch, ref) {
  const { clientWidth, clientHeight } = ref.current

  const list = new SelectionSort(clientWidth, clientHeight)

  /** Setup function invoked by p5 */
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.noLoop()
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