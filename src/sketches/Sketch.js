import React, { createRef, useEffect } from 'react'

import p5 from 'p5'

import Test from './test/Test'

/** Sketch Component
 * @returns A p5.js instance within a component
 */
export default function Sketch() {
  /** Reference for p5 to draw canvas */
  const ref = createRef()

  /** Create new instance of p5 */
  let instance
  useEffect(() => instance = new p5(Test, ref.current), [instance])

  return <div ref={ref} />
}