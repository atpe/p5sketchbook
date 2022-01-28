// Local component imports
import { Vector } from 'p5'
import Algorithm from './algorithm'

export default function sketch(sketch, ref) {
  // Get canvas width and height
  const { clientWidth, clientHeight } = ref.current

  function draw() {
    sketch.background(120)
    sketch.stroke(255)
    sketch.noFill()
    sketch.rect(sketch.offset.x, sketch.offset.y, sketch.gridSize.x, sketch.gridSize.y)
    sketch.gameOfLife.draw(sketch)
  }

  function handleClick() {
    if (
      sketch.mouseX < sketch.offset.x || sketch.mouseX > clientWidth - sketch.offset.x ||
      sketch.mouseY < sketch.offset.y || sketch.mouseY > clientHeight - sketch.offset.y
    ) return

    const position = sketch.createVector(
      sketch.mouseX - sketch.offset.x,
      sketch.mouseY - sketch.offset.y
    )

    sketch.gameOfLife.handleClick(position)

    draw()
  }

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
    sketch.gameOfLife.reset()
    sketch.noLoop()
    draw()
  }

  // Sets up the sketch
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.frameRate(10)
    sketch.noLoop()

    sketch.cellSize = sketch.createVector(20, 20)

    const canvasSize = sketch.createVector(clientWidth, clientHeight)
    const rem = Vector.rem(canvasSize, sketch.cellSize)

    sketch.gridSize = Vector.sub(canvasSize, rem)
    sketch.offset = Vector.div(rem, 2)

    sketch.gameOfLife = new Algorithm(sketch.gridSize, sketch.cellSize)
  }

  // Called when mouse is clicked
  sketch.mouseClicked = () => {
    if (!sketch.isLooping()) handleClick()
  }

  sketch.keyPressed = () => {

  }

  // Draws the sketch
  sketch.draw = () => {
    if (sketch.mouseIsPressed) handleClick()
    if (sketch.isLooping()) sketch.gameOfLife.iterate()
    draw()
  }
}