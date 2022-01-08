import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

import SelectionSort from './algorithms/selectionSort'

export function sortingActions(handleClick) {
  return (
    <>
      <CardContent>
        <FormControl fullWidth>
          <InputLabel id='algorithm-select-label'>Algorithm</InputLabel>
          <Select
            labelId='algorithm-select-label'
            id='algorithm-select'
          >
            <MenuItem value='SELECTION'>Selection Sort</MenuItem>
            <MenuItem value='INSERTION'>Insertion Sort</MenuItem>
          </Select>
        </FormControl>
      </CardContent>

      <CardActions>
        <Button onClick={handleClick}>Run</Button>
      </CardActions>
    </>
  )
}

/** Main sorting sketch function
 *  @param {Object} sketch The p5.js sketch function
 */
export function sortingSketch(sketch, ref) {
  const { clientWidth, clientHeight } = ref.current

  const list = new SelectionSort(clientWidth, clientHeight)

  /** Setup function invoked by p5 */
  sketch.setup = () => {
    console.log(`${clientWidth} x ${clientHeight}`);
    sketch.createCanvas(clientWidth, clientHeight)
    list.init()
    list.shuffle()
  }

  /** Draw function invoked by p5 */
  sketch.draw = () => {
    sketch.background(120)
    list.sort()
    list.draw(sketch)
    list.highlight(sketch)
  }
}