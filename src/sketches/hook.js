import { createRef, useEffect } from "react"
import p5 from "p5"

export default function useSketch(sketch, constants) {
  const ref = createRef()

  useEffect(() => {
    let instance = new p5(s => sketch(s, ref), ref.current)
    ref.current = { ...ref.current, ...constants }
    ref.current.sketch = instance
    return () => instance.remove()
  }, [sketch, constants, ref])
  // Return the created reference object
  return ref
}