// Local component imports
import World from './algorithm/world'

export default function sketch(sketch, ref) {
  // Get canvas width and height
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
    sketch.background(120)
    sketch.redraw()
  }

  // Called when the mouse is released
  sketch.mouseReleased = () => {
    const left = sketch.mouseX < 0
    const right = sketch.mouseX > clientWidth
    const above = sketch.mouseY < 0
    const below = sketch.mouseY > clientHeight
    if (left || right || above || below) return
    if (sketch.keyIsDown(sketch.SHIFT)) {
      const point = sketch.createVector(sketch.mouseX, sketch.mouseY)
      sketch.world.addCenter(point)
      if (!sketch.isLooping()) sketch.redraw()
    }
  }

  sketch.keyPressed = () => {
    if (sketch.keyIsDown(sketch.BACKSPACE)) sketch.world.removeCenter()
  }

  // Sets up the sketch
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.background(120)
    sketch.noLoop()

    const size = sketch.createVector(clientWidth, clientHeight)
    sketch.world = new World(size)
  }

  // Draws the sketch
  sketch.draw = () => {
    const mouse = {
      pressed: sketch.mouseIsPressed,
      x: sketch.mouseX,
      y: sketch.mouseY,
    }
    if (sketch.isLooping()) sketch.world.update(mouse)
    sketch.world.draw(sketch)
  }
}