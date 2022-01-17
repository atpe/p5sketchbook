/**
 * @module AStarSearch
 * @author Adam Evans
 */

// MUI component imports
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
// Local component imports
import TileMap from './tileMap'

export function aStarSearchActions(actions) {
  return (
    <>
      <CardActions>
        <Button onClick={(e) => { actions.reset(); e.preventDefault() }}>Reset</Button>
      </CardActions >
    </>
  )
}

/** Main A* search sketch function
 *  @param {Function} sketch The p5.js sketch function
 *  @param {React.RefObject} sketch The p5.js sketch function
 */
export function aStarSearchSketch(sketch, sketchRef) {
  const { clientWidth, clientHeight } = sketchRef.current

  /** Resets the sketch */
  function reset() {

  }

  /** Sets up the sketch */
  function setup() {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.rectMode(sketch.CENTER)

    const center = sketch.createVector(clientWidth / 2, clientHeight / 2)
    const mapSize = sketch.createVector(clientWidth, clientHeight)
    const tileSize = sketch.createVector(50, 50)

    sketch.tileMap = new TileMap(center, mapSize, tileSize)

  }

  /** IS called when the mouse is clicked */
  function mouseClicked() {
    if (sketch.tileMap.complete) return
    const left = sketch.mouseX < 0
    const right = sketch.mouseX > clientWidth
    const above = sketch.mouseY < 0
    const below = sketch.mouseY > clientHeight
    if (!(left || right || above || below)) {

    }
  }

  /** Draws the sketch */
  function draw() {
    sketch.push()
    sketch.background(120)
    sketch.tileMap.draw(sketch)
    sketch.pop()
  }

  sketch.reset = () => reset()
  sketch.setup = () => setup()
  sketch.mouseClicked = () => mouseClicked()
  sketch.draw = () => draw()
}