/**
 * @module AStarSearch
 * @author Adam Evans
 */

// MUI component imports
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
// Local component imports
import TileMap from './components/tileMap'
import AStarSearch from './components/aStarSearch';

export function aStarSearchActions(actions) {
  return (
    <>
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
    sketch.loop()
  }

  /** Pauses the sketch */
  function pause() {
    sketch.noLoop()
  }

  /** Resets the sketch */
  function reset() {
    sketch.noiseSeed(Math.random() * 1000)
    sketch.randomSeed(Math.random() * 1000)

    sketch.center = sketch.createVector(clientWidth / 2, clientHeight / 2)
    sketch.mapSize = sketch.createVector(clientWidth, clientHeight)
    sketch.tileSize = sketch.createVector(10, 10)


    sketch.tileMap = new TileMap(sketch.center, sketch.mapSize, sketch.tileSize)
    sketch.tileMapImage = sketch.createGraphics(sketch.tileMap.mapSize.x, sketch.tileMap.mapSize.y)
    sketch.tileMap.createTiles(sketch)
    sketch.astar = new AStarSearch(sketch.tileMap)
    sketch.astar.init(sketch.tileMap.getRandomTile(sketch), sketch.tileMap.getRandomTile(sketch))

    sketch.redraw()
  }

  /** Sets up the sketch */
  function setup() {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.rectMode(sketch.CENTER)
    sketch.noLoop()

    sketch.reset()
  }

  /** Called when the mouse is clicked */
  function mouseClicked() {
    const left = sketch.mouseX < 0
    const right = sketch.mouseX > clientWidth
    const above = sketch.mouseY < 0
    const below = sketch.mouseY > clientHeight
    if (!(left || right || above || below)) {
    }
  }

  /** Draws the sketch */
  function draw() {
    if (sketch.isLooping()) sketch.astar.iterate()

    sketch.push()
    sketch.background(120)
    sketch.tileMap.draw(sketch)
    sketch.astar.draw(sketch)
    sketch.pop()
  }

  sketch.start = () => start()
  sketch.pause = () => pause()
  sketch.reset = () => reset()
  sketch.setup = () => setup()
  sketch.mouseClicked = () => mouseClicked()
  sketch.draw = () => draw()
}