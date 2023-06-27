import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'redux/store/index'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const Theme = createTheme({
  palette: {
    primary: {
      main: '#007aff',
    },
    secondary: {
      main: '#fff',
    },
  },
})
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
