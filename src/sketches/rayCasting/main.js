import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Caster from './components/caster'
import Box from './components/box'

export function rayCastingActions(actions) {
  return (
    <>
      <CardContent>
        <Typography>Use the WASD keys to move the caster around to see how its rays interact with the boundaries.</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={actions.reset}>Reset</Button>
      </CardActions >
    </>
  )
}

/** Main rayCasting sketch function
 *  @param {Object} sketch The p5.js sketch function
 */
export function rayCastingSketch(sketch, sketchRef) {
  const { clientWidth, clientHeight } = sketchRef.current

  let caster
  sketch.boxes = []

  sketch.reset = () => {
    console.log('hit');
    caster.reset(sketch.createVector(clientWidth / 2, clientHeight / 2))
  }

  /** Setup function invoked by p5 */
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.frameRate(60)

    const center = sketch.createVector(clientWidth / 2, clientHeight / 2)

    const viewDistance = Math.max(clientWidth, clientHeight)
    caster = new Caster(center, viewDistance / 25, viewDistance)

    const size = sketch.createVector(clientWidth * 0.9, clientHeight * 0.9)
    sketch.boxes.push(new Box(center, size))
  }

  /** Draw function invoked by p5 */
  sketch.draw = () => {
    sketch.background(120)

    if (sketch.isLooping()) caster.move(sketch)

    caster.cast(sketch.boxes)
    caster.draw(sketch)
    for (const box of sketch.boxes) box.draw(sketch)
  }
}