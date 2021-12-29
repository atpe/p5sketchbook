import React, { createRef, useEffect } from 'react'

import p5 from 'p5'

/** Sketch component
 * @returns A p5.js instance within a component
 */
export default function Sketch(props) {
  /** Reference for p5 to draw canvas */
  const ref = createRef()

  /** Create new instance of p5 */
  let instance
  useEffect(() => instance = new p5(props.sketch, ref.current), [instance])

  /** Return sketch */
  return <div ref={ref} />
}