// Local component imports
import Quadtree from './algorithm/quadtree'
import Box from './algorithm/box'

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
    sketch.pointImage.clear()
    sketch.quadtree.reset()
    sketch.query.position = sketch.createVector(clientWidth / 2, clientHeight / 4)
    sketch.points = []
  }

  // Sets up the sketch
  sketch.setup = () => {
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

  // Called when mouse is pressed
  sketch.mouseClicked = () => {
    if (!ref.current) return
    sketch.pointImage.strokeWeight(5)
    sketch.pointImage.stroke(255, 100)
    if (sketch.points.length + ref.current.multPoints <= ref.current.pointLimit) {
      if (sketch.keyIsDown(sketch.SHIFT)) {
        for (let i = 0; i < ref.current.multPoints; i++) {
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
    if (sketch.points.length < ref.current.pointLimit) {
      const point = sketch.createVector(sketch.mouseX, sketch.mouseY)
      if (sketch.quadtree.contains(point)) {
        sketch.quadtree.push(point)
        sketch.points.push(point)
        sketch.pointImage.point(point)
      }
    }
  }

  // Draws the sketch
  sketch.draw = () => {
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
      const c = ', with an efficiency of'
      const noResults = result.length === 0
      const noChecks = checks === 0
      let text = ''
      if (noChecks) return
      if (noResults) text = `${checks} ${a} ${sketch.points.length} ${b}`
      else text = `${checks} ${a} ${sketch.points.length} ${b}${c} ${Math.ceil(result.length * 100 / checks)}%`
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
}