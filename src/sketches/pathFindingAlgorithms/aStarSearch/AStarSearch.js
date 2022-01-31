// MUI component imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// Local component imports
import useSketch from '../../hook'
import sketch from './sketch'

export default function AStarSearch() {
  const ref = useSketch(sketch)

  function handleClick(event) {
    const key = event.target.id
    ref.current?.sketch[key]()
    event.preventDefault()
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography>Click on the canvas to select the start point for the path.</Typography>
          <Typography>Click on the canvas, whilst holding SHIFT, to select the end point.</Typography>
          <Typography>When both have been selected, click START to run the algorithm.</Typography>
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