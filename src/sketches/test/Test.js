/** Main test sketch function
 *  @param {Object} s The p5.js sketch function
 */
export default function Test(s) {
  /** Setup function invoked by p5 */
  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight)
    s.background(120)
    s.noStroke()
  }
  /** Draw function invoked by p5 */
  s.draw = () => {
    const x = s.random(0, s.windowWidth)
    const y = s.random(0, s.windowHeight)
    s.ellipse(x, y, 10)
  }
}