/**
 * @module sortingAlgorithms
 * @author Adam Evans
 */

// MUI component imports
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
// Local component imports

/**
 * Render sketch
 * 
 * @default
 * @returns {React.Component} Sketch component
 */
export function sortingActions(actions) {
  return (
    <CardActions>
      <Button onClick={actions.start}>Start</Button>
      <Button onClick={actions.pause}>Pause</Button>
      <Button onClick={actions.reset}>Reset</Button>
    </CardActions >
  )
}

/** 
 * Main sorting algorithm sketch function
 * 
 * @param {Object} sketch The p5.js sketch function for sorting algorithms
 * @param {List} list The list to be sorted by the sketch
 */
export function sortingSketch(sketch, list) {
  /** Starts the sketch */
  function start() {
    sketch.loop()
  }

  /** Pauses the sketch */
  function pause() {
    sketch.noLoop()
  }

  /** Resets the sketch */
  function reset() {
    list.reset()
    sketch.redraw()
  }

  /** Sets up the sketch */
  function setup() {
    sketch.createCanvas(list.width, list.height)
    sketch.noLoop()
    sketch.frameRate(10)
  }

  /** Draws the sketch */
  function draw() {
    sketch.background(120)
    if (sketch.isLooping()) list.sort()
    list.draw(sketch)
    list.highlight(sketch)
  }

  sketch.start = () => start()
  sketch.pause = () => pause()
  sketch.reset = () => reset()
  sketch.setup = () => setup()
  sketch.draw = () => draw()
}