// Local component imports
import World from './algorithm/world'

export default function sketch(sketch, ref) {
  const { clientWidth, clientHeight } = ref.current

  // Starts the sketch
  sketch.start = () => {
    sketch.loop()
  }

  // Pauses the sketch
  sketch.pause = () => {
    sketch.noLoop()
  }

  // Resets the sketch
  sketch.reset = () => {
    sketch.world.reset()
  }

  // Sets up the sketch
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.frameRate(60)
    sketch.rectMode(sketch.CENTER)

    const center = sketch.createVector(clientWidth / 2, clientHeight / 2)
    const size = sketch.createVector(clientWidth, clientHeight)

    sketch.world = new World(center, size)
  }

  // Called when mouse is pressed
  sketch.mouseClicked = () => {
    if (!ref.current) return
    const position = sketch.createVector(sketch.mouseX, sketch.mouseY)
    const limitReached = sketch.world.obstacles.length === ref.current.obstacleLimit
    if (sketch.world.contains(position) && !limitReached) {
      sketch.world.addObstacle(position)
    }
  }

  // Draws the sketch
  sketch.draw = () => {
    sketch.background(120)
    sketch.world.update(sketch)
  }
}