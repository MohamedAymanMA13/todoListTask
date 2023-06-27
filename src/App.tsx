import React, { Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from 'components/NavBar/NavBar'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store/reducers'

import ToDoList from 'pages/ToDoList/ToDoList'
import Forecast from 'pages/Forecast/Forecast'

import FormToDoList from 'pages/ToDoList/FormToDoList/FormToDoList'

import { toast, ToastContainer } from 'react-toastify'
import { Modal, Box, Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import i18n from './i18n'

import 'react-toastify/dist/ReactToastify.css'

function App(): JSX.Element {
  const { t } = useTranslation('', { i18n })
  const state = useSelector((state: RootState) => state)
  const [darkMode, setDarkMode] = useState(false)

  const Theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',

      primary: {
        main: '#007aff',
      },
      secondary: {
        main: '#fff',
      },
    },
  })
  return (
    <ThemeProvider theme={Theme}>
      <div className="">
        <div className="">
          <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className=" ">
            <Suspense>
              <Routes>
                <Route path="/" element={<ToDoList />} />
                <Route path="/forecast" element={<Forecast />} />
                <Route path="/add" element={<FormToDoList />} />
                <Route path="/edit/:id" element={<FormToDoList mode="edit" />} />
              </Routes>
            </Suspense>
          </div>
          {/* {(loadingCounter > 0 || JSON.stringify(state).includes('pending')) && <Loading />} */}
        </div>
      </div>{' '}
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App
