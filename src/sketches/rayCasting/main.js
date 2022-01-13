import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Caster from './components/caster'
import Box from './components/box'

const obstacleLimit = 100

export function rayCastingActions(actions) {
  return (
    <>
      <CardContent>
        <Typography>
          Use the W, A, S, and D keys to move the caster around to see how its rays interact with the boundaries.
        </Typography>
        <Typography>
          Click the mouse to insert an obstacle. (Number of obtacles is limited to {obstacleLimit}).
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={(e) => { actions.reset(); e.preventDefault() }}>Reset</Button>
      </CardActions >
    </>
  )
}

/** Main rayCasting sketch function
 *  @param {Object} sketch The p5.js sketch function
 */
export function rayCastingSketch(sketch, sketchRef) {
  const { clientWidth, clientHeight } = sketchRef.current

  sketch.boxes = []

  sketch.reset = () => {
    sketch.boxes = [sketch.boxes[0]]
    sketch.caster.reset(sketch.createVector(clientWidth / 2, clientHeight / 2))
  }

  /** Setup function invoked by p5 */
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.frameRate(60)
    sketch.rectMode(sketch.CENTER)

    const center = sketch.createVector(clientWidth / 2, clientHeight / 2)

    const viewDistance = Math.max(clientWidth, clientHeight)
    sketch.caster = new Caster(center, viewDistance / 50, viewDistance)

    const weight = viewDistance / 100
    const size = sketch.createVector(clientWidth - weight, clientHeight - weight)
    sketch.boxes.push(new Box(center, size, weight))
  }

  sketch.mousePressed = () => {
    const position = sketch.createVector(sketch.mouseX, sketch.mouseY)
    if (sketch.boxes[0].contains(position) && sketch.boxes.length <= obstacleLimit) {
      sketch.boxes.push(sketch.boxes[0].createInnerBoxAt(position))
    }
  }

  /** Draw function invoked by p5 */
  sketch.draw = () => {
    sketch.background(120)

    if (sketch.isLooping()) sketch.caster.move(sketch)

    sketch.caster.cast(sketch.boxes)
    sketch.caster.draw(sketch)
    for (const box of sketch.boxes) box.draw(sketch)

    sketch.text(Math.round(sketch.frameRate(), 2), 10, 20)
  }
}