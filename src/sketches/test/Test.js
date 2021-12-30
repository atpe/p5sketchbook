/** Main test sketch function
 *  @param {Object} s The p5.js sketch function
 */
export default function test(s, ref) {
  /** Setup function invoked by p5 */
  s.setup = () => {
    s.createCanvas(ref.current.clientWidth, ref.current.clientHeight)
    s.background(120)
    s.noStroke()
  }
  /** Draw function invoked by p5 */
  s.draw = () => {
    const x = s.random(0, ref.current.clientWidth)
    const y = s.random(0, ref.current.clientHeight)
    s.ellipse(x, y, 10)
  }
}