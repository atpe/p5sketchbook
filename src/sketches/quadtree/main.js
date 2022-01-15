/**
 * @module Quadtree
 * @author Adam Evans
 */

// MUI component imports
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
// Local component imports
import Quadtree from './components/quadtree'
import Box from './components/box'


const pointLimit = 1000
const multPoints = 100

export function quadtreeActions(actions) {
  return (
    <>
      <CardContent>
        <Typography>
          Use the W, A, S, and D keys to modve the query box.
        </Typography>
        <Typography>
          Click the mouse in the top half of the sketch to insert a point at that position.
        </Typography>
        <Typography>
          Hold SHIFT and click to add {multPoints} random points (Limited to {pointLimit}).
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
    sketch.pointImage.clear()
    sketch.quadtree.reset()
    sketch.query.position = sketch.createVector(clientWidth / 2, clientHeight / 4)
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

    const center = sketch.createVector(clientWidth / 2, clientHeight / 4)
    const size = sketch.createVector(clientWidth, clientHeight / 2)

    sketch.pointImage = sketch.createGraphics(size.x, size.y)
    sketch.query = new Box(center, size.copy().div(5))
    sketch.quadtree = new Quadtree(center, size, 10)
    sketch.points = []
  }

  /**
   * Is called when mouse is pressed
   * 
   * @param {Function} sketch The p5.js sketch function
   */
  function mousePressed(sketch) {
    sketch.pointImage.strokeWeight(5)
    sketch.pointImage.stroke(255, 100)
    if (sketch.points.length + multPoints <= pointLimit) {
      if (sketch.keyIsDown(sketch.SHIFT)) {
        for (let i = 0; i < 100; i++) {
          const randX = Math.random() * clientWidth
          const randY = Math.random() * clientHeight / 2
          const point = sketch.createVector(randX, randY)
          sketch.points.push(point)
          sketch.quadtree.push(point)
          sketch.pointImage.point(point)
        }
        return
      }
    }
    if (sketch.points.length < pointLimit) {
      const point = sketch.createVector(sketch.mouseX, sketch.mouseY)
      if (sketch.quadtree.contains(point)) {
        sketch.quadtree.push(point)
        sketch.points.push(point)
        sketch.pointImage.point(point)
      }
    }
  }

  /**
   * Draws the sketch
   * 
   * @param {Function} sketch The p5.js sketch function
   */
  function draw(sketch) {
    sketch.push()
    sketch.background(120)
    sketch.query.move(sketch)
    const { result, checks } = sketch.quadtree.query(sketch.query)

    function drawHalf() {
      sketch.image(sketch.pointImage, 0, 0)
      sketch.query.draw(sketch)
      for (const point of result) {
        sketch.strokeWeight(5)
        sketch.stroke(255)
        sketch.point(point)
      }
    }

    function drawText(checks) {
      const a = 'of'
      const b = 'points were checked this frame'
      const c = 'with an efficiency of'
      const noResults = result.length === 0
      const noChecks = checks === 0
      let text = ''
      if (noChecks) return
      if (noResults) text = `${checks} ${a} ${sketch.points.length} ${b}`
      else text = `${checks} ${a} ${sketch.points.length} ${b} ${c} ${Math.ceil(result.length * 100 / checks)}%`
      sketch.noStroke()
      sketch.fill(255)
      sketch.textAlign(sketch.LEFT, sketch.CENTER)
      sketch.text(text, 10, 20)
    }


    sketch.quadtree.draw(sketch)
    drawHalf()
    drawText(checks)

    sketch.translate(0, clientHeight / 2)
    drawHalf()
    drawText(sketch.points.length)

    sketch.pop()

    sketch.stroke(0)
    sketch.strokeWeight(5)
    sketch.line(0, clientHeight / 2, clientWidth, clientHeight / 2)
  }

  sketch.reset = () => reset(sketch)
  sketch.setup = () => setup(sketch)
  sketch.mousePressed = () => mousePressed(sketch)
  sketch.draw = () => draw(sketch)
}