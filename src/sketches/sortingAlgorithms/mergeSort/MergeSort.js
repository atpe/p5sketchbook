// MUI component imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
// Local component imports
import useSketch from '../../hook'
import sketch from './sketch'

export default function MergeSort() {
  const ref = useSketch(sketch)

  function handleClick(event) {
    const key = event.target.id
    ref.current?.sketch[key]()
    event.preventDefault()
  }

  return (
    <>
      <Card>
        <CardHeader title='Merge Sort' />
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