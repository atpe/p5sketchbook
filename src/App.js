import React, { createRef, useEffect } from 'react'

import p5 from 'p5'

function App() {
  function sketch(sketch) {
    sketch.setup = () => {
      sketch.createCanvas(100, 100)
      sketch.background(120)
    }

    sketch.draw = () => {
      const i = sketch.random(0, 100)
      sketch.ellipse(50, i, 10)
    }
  }

  let _p5
  const sketchRef = createRef()
  useEffect(() => _p5 = new p5(sketch, sketchRef.current), [_p5])

  return (
    <div ref={sketchRef} />
  )
}

export default App
