import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Switch } from '@mui/material'
import './NavBar.scss'

export default function NavBar({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean
  setDarkMode: (x: boolean) => void
}): JSX.Element {
  const { t } = useTranslation()

  const handleThemeChange = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div>
      <CssBaseline />
      <div className="navbar">
        <div className="navbar__mode">
          {t('mode')}
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </div>
      </div>
    </div>
  )
}
