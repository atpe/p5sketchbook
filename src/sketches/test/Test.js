import React, { createRef, useEffect } from 'react'

import p5 from 'p5'

/** Main component for the sketch */
export default function Test() {
  /** Creates the p5 sketch
   *  @param {Object} sketch The p5.js sktech function
   */
  function sketch(sketch) {
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

  const sketchRef = createRef()
  let _p5
  // Create sketch if it doesn't exist
  useEffect(() => {
    _p5 = new p5(sketch, sketchRef.current)
  }, [_p5])

  // Return the div containing the sketch
  return <div ref={sketchRef} />
}