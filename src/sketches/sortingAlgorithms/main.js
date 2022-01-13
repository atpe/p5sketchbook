/**
 * @module sortingAlgorithms
 * @author Adam Evans
 */

// MUI component imports
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
// Local component imports
import List from './list'

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
  /**
   * Resets the sketch
   * 
   * @param {Function} sketch The p5.js sketch function for sorting algorithms
   * @param {List} list The list to be sorted by the sketch 
   */
  function reset(sketch, list) {
    list.reset()
    sketch.redraw()
  }

  /**
   * Sets up the sketch
   * 
   * @param {Function} sketch The p5.js sketch function for sorting algorithms
   * @param {List} list The list to be sorted by the sketch 
   */
  function setup(sketch, list) {
    sketch.createCanvas(list.width, list.height)
    sketch.noLoop()
    sketch.frameRate(10)
  }

  /**
   * Draws the sketch
   * 
   * @param {Function} sketch The p5.js sketch function for sorting algorithms
   * @param {List} list The list to be sorted by the sketch 
   */
  function draw(sketch, list) {
    sketch.background(120)
    if (sketch.isLooping()) list.sort()
    list.draw(sketch)
    list.highlight(sketch)
  }
  sketch.reset = () => reset(sketch, list)
  sketch.setup = () => setup(sketch, list)
  sketch.draw = () => draw(sketch, list)
}