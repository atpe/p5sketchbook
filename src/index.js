/**
 * Index.js
 * 
 * @file Main entry point for SketchBook app.
 * @author Adam Evans
 * 
 * @requires module:App
 */

// React imports
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
// React-router imports
import { BrowserRouter } from 'react-router-dom'
// React redux imports
import { Provider } from 'react-redux'
// MUI imports
import { createTheme, ThemeProvider } from '@mui/material/styles'
// Local imports
import { store } from './app/store'
import './index.css'
import App from './App'

// Theme object to be used by theme provider
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

// Main render function
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
