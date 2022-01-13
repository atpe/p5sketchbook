/**
 * SketchBook
 * @namespace SketchBook
 * @author Adam Evans
 * @version 0.0.1
 */


import React from 'react'
import ReactDOM from 'react-dom'
import { store } from './app/store'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './App'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import './index.css'

const theme = createTheme({
  palette: {
    primary: {
      light: '#819ca9',
      main: '#546e7a',
      dark: '#29434e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff96ba',
      main: '#ff638a',
      dark: '#c72c5d',
      contrastText: '#000',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
