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

  return (
    <>
      <Card>
        <CardHeader title='Elementary Cellular Automata' />
        <CardContent>
          <Typography>Click on a rule to expand it and press the ESCAPE key to return to the rule grid.</Typography>
          <Typography>Note that framerate may be low on larger screens.</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={(e) => { e.preventDefault(); ref.current?.sketch.start() }}>Start</Button>
          <Button onClick={(e) => { e.preventDefault(); ref.current?.sketch.pause() }}>Pause</Button>
          <Button onClick={(e) => { e.preventDefault(); ref.current?.sketch.reset() }}>Reset</Button>
        </CardActions >
      </Card>
      <br />
      <Card sx={{ padding: '0px', flex: 1 }} ref={ref} />
    </>
  )
}