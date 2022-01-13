/**
 * @module Quadtree
 * @author Adam Evans
 */

// MUI component imports
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Quadtree from './components/quadtree'

// Local component imports

const pointLimit = 1000

export function quadtreeActions(actions) {
  return (
    <>
      <CardContent>
        <Typography>
          Click the mouse to insert a point. (Limited to {pointLimit}).
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={(e) => { actions.reset(); e.preventDefault() }}>Reset</Button>
      </CardActions >
    </>
  )
}

/** Main quadtree sketch function
 *  @param {Function} sketch The p5.js sketch function
 *  @param {React.RefObject} sketch The p5.js sketch function
 */
export function quadtreeSketch(sketch, sketchRef) {
  const { clientWidth, clientHeight } = sketchRef.current

  /**
   * Resets the sketch
   * 
   * @param {Function} sketch The p5.js sketch function
   */
  function reset(sketch) {
    sketch.quadtree.reset()
    sketch.points = []
  }

  /**
   * Sets up the sketch
   * 
   * @param {Function} sketch The p5.js sketch function
   */
  function setup(sketch) {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.frameRate(60)
    sketch.rectMode(sketch.CENTER)

    const center = sketch.createVector(clientWidth / 2, clientHeight / 2)
    const size = sketch.createVector(clientWidth, clientHeight)

    sketch.quadtree = new Quadtree(center, size, 10)
    sketch.points = []
  }

  /**
   * Is called when mouse is pressed
   * 
   * @param {Function} sketch The p5.js sketch function
   */
  function mousePressed(sketch) {
    const point = sketch.createVector(sketch.mouseX, sketch.mouseY)
    if (sketch.quadtree.contains(point)) {
      sketch.quadtree.push(point)
      sketch.points.push(point)
    }
  }

  /**
   * Draws the sketch
   * 
   * @param {Function} sketch The p5.js sketch function
   */
  function draw(sketch) {
    sketch.background(120)

    sketch.quadtree.draw(sketch)

    for (const point of sketch.points) {
      sketch.stroke(255)
      sketch.point(point)
    }
  }

  sketch.reset = () => reset(sketch)
  sketch.setup = () => setup(sketch)
  sketch.mousePressed = () => mousePressed(sketch)
  sketch.draw = () => draw(sketch)
}