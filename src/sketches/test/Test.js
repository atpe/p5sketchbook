/** Main test sketch function */
export default function Test(sketch) {
  // Setup function invoked by p5
  sketch.setup = () => {
    sketch.createCanvas(100, 100)
    sketch.background(120)
  }
  // Draw function invoked by p5
  sketch.draw = () => {
    const i = sketch.random(0, 100)
    sketch.ellipse(50, i, 10)
  }
}