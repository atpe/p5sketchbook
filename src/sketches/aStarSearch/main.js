/**
 * @module AStarSearch
 * @author Adam Evans
 */

// MUI component imports
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// Local component imports
import TileMap from './components/tileMap'
import AStarSearch from './components/aStarSearch';

export function aStarSearchActions(actions) {
  return (
    <>
      <CardContent>
        <Typography>Click on the canvas to select the start point.</Typography>
        <Typography>Click on the canvas while holding SHIFT to select the end point.</Typography>
        <Typography>When both have been selected, click START to run the algorithm.</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={(e) => { actions.start(); e.preventDefault() }}>Start</Button>
        <Button onClick={(e) => { actions.pause(); e.preventDefault() }}>Pause</Button>
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

  /** Starts the sketch */
  function start() {
    if (sketch.startPoint && sketch.endPoint) {
      sketch.astar.init(sketch.startPoint, sketch.endPoint)
      sketch.loop()
    }
  }

  /** Pauses the sketch */
  function pause() {
    if (sketch.isLooping()) sketch.noLoop()
  }

  /** Resets the sketch */
  function reset() {
    sketch.noiseSeed(Math.random() * 1000)
    sketch.randomSeed(Math.random() * 1000)
    sketch.noLoop()

    sketch.center = sketch.createVector(clientWidth / 2, clientHeight / 2)
    sketch.mapSize = sketch.createVector(clientWidth, clientHeight)
    sketch.tileSize = sketch.createVector(10, 10)

    sketch.tileMap = new TileMap(sketch.center, sketch.mapSize, sketch.tileSize)
    sketch.tileMapImage = sketch.createGraphics(sketch.mapSize.x, sketch.mapSize.y)
    sketch.tileMap.createTiles(sketch)

    sketch.astar = new AStarSearch(sketch.tileMap)
    sketch.startPoint = undefined
    sketch.endPoint = undefined

    sketch.redraw()
  }

  /** Sets up the sketch */
  function setup() {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.rectMode(sketch.CENTER)
    sketch.imageMode(sketch.CENTER)

    sketch.reset()
  }

  /** Called when the mouse is clicked */
  function mouseClicked() {
    const left = sketch.mouseX < 0
    const right = sketch.mouseX > clientWidth
    const above = sketch.mouseY < 0
    const below = sketch.mouseY > clientHeight
    if (!(left || right || above || below)) {
      if (!sketch.keyIsDown(sketch.SHIFT)) {
        sketch.startPoint = sketch.tileMap.getTileAt(sketch.createVector(sketch.mouseX, sketch.mouseY))
      } else {
        sketch.endPoint = sketch.tileMap.getTileAt(sketch.createVector(sketch.mouseX, sketch.mouseY))
      }
    }
    sketch.redraw()
  }

  /** Draws the sketch */
  function draw() {
    if (sketch.isLooping()) sketch.astar.iterate(sketch)

    sketch.push()
    sketch.background(120)
    sketch.tileMap.draw(sketch)
    sketch.astar.draw(sketch)

    sketch.stroke([237, 34, 100])
    sketch.strokeWeight(Math.sqrt(sketch.tileSize.mag()) * 2)
    if (sketch.startPoint) sketch.point(sketch.startPoint.position)
    if (sketch.endPoint) sketch.point(sketch.endPoint.position)

    if (sketch.isLooping()) {
      sketch.noStroke()
      sketch.fill(255)
      sketch.text(Math.min(60, Math.round(sketch.frameRate())), 10, 20)
    }
    sketch.pop()
  }

  sketch.start = () => start()
  sketch.pause = () => pause()
  sketch.reset = () => reset()
  sketch.setup = () => setup()
  sketch.mouseClicked = () => mouseClicked()
  sketch.draw = () => draw()
}