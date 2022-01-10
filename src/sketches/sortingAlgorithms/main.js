import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

export function sortingActions(actions) {
  return (
    <CardActions>
      <Button onClick={actions.start}>Start</Button>
      <Button onClick={actions.pause}>Pause</Button>
      <Button onClick={actions.reset}>Reset</Button>
    </CardActions >
  )
}

/** Main sorting sketch function
 *  @param {Object} sketch The p5.js sketch function
 */
export function sortingSketch(sketch, list) {
  sketch.reset = () => {
    list.reset()
    sketch.redraw()
  }

  /** Setup function invoked by p5 */
  sketch.setup = () => {
    sketch.createCanvas(list.width, list.height)
    sketch.noLoop()
    sketch.frameRate(10)
    list.init()
    list.shuffle()
  }

  /** Draw function invoked by p5 */
  sketch.draw = () => {
    sketch.background(120)
    if (sketch.isLooping()) list.sort()
    list.draw(sketch)
    list.highlight(sketch)
  }
}