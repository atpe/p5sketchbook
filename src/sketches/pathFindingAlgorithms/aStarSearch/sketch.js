// Local component imports
import TileMap from './algorithm/tileMap'
import AStarSearch from './algorithm/aStarSearch';

export default function sketch(sketch, ref) {
  const { clientWidth, clientHeight } = ref.current

  // Starts the sketch
  sketch.start = () => {
    if (sketch.startPoint && sketch.endPoint) {
      sketch.astar.init(sketch.startPoint, sketch.endPoint)
      sketch.loop()
    }
  }

  // Pauses the sketch
  sketch.pause = () => {
    if (sketch.isLooping()) sketch.noLoop()
  }

  // Resets the sketch
  sketch.reset = () => {
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

  // Sets up the sketch
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.rectMode(sketch.CENTER)
    sketch.imageMode(sketch.CENTER)

    sketch.reset()
  }

  // Called when the mouse is clicked
  sketch.mouseClicked = () => {
    if (!ref.current) return
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

  // Draws the sketch
  sketch.draw = () => {
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
}