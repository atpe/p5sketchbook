// MUI component imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
// Local component imports
import useSketch from '../../hook'
import sketch from './sketch'

export default function ElementaryCellularAutomata() {
  const ref = useSketch(sketch)

  function handleClick(event) {
    const key = event.target.id
    ref.current?.sketch[key]()
    event.preventDefault()
  }

  return (
    <>
      <Card>
        <CardHeader title='Elementary Cellular Automata' />
        <CardContent>
          <Typography>Click on a rule to expand it and press the ESCAPE key to return to the rule grid.</Typography>
          <Typography>Note that framerate may be low on larger screens.</Typography>
        </CardContent>
        <CardActions>
          <Button id='start' onClick={handleClick}>Start</Button>
          <Button id='pause' onClick={handleClick}>Pause</Button>
          <Button id='reset' onClick={handleClick}>Reset</Button>
        </CardActions >
      </Card>
      <br />
      <Card sx={{ padding: '0px', flex: 1 }} ref={ref} />
    </>
  )
}