import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
} from '@mui/material'
import Actions from 'components/Actions/Actions'
import { useGetForecastQuery } from 'redux/store/actions'
import { RootState } from 'redux/store/reducers'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import dayjs from 'dayjs'

function ToDoList(): JSX.Element {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null)
  const { data } = useGetForecastQuery(coords || skipToken)
  const columns = [
    {
      value: '',
      label: 'Date & Time',
      minWidth: 170,
      // eslint-disable-next-line react/no-unstable-nested-components
      format: (value: any, row: any) => {
        return <div>{dayjs(row.dt_txt).format('DD/MM/YYYY HH:MM A')}</div>
      },
    },
    {
      value: '',
      label: 'Min Temp',
      minWidth: 100,
      // eslint-disable-next-line react/no-unstable-nested-components
      format: (value: any, row: any) => {
        return <div>{Math.round(row.main.temp_min - 273.15)}°C</div>
      },
    },
    {
      value: '',
      label: 'Max Temp',
      minWidth: 100,
      // eslint-disable-next-line react/no-unstable-nested-components
      format: (value: any, row: any) => {
        return <div>{Math.round(row.main.temp_max - 273.15)}°C</div>
      },
    },
    {
      value: '',
      label: 'Temp',
      minWidth: 100,
      // eslint-disable-next-line react/no-unstable-nested-components
      format: (value: any, row: any) => {
        return <div>{Math.round(row.main.temp - 273.15)}°C</div>
      },
    },
  ]
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        error => {
          setCoords(null)
        },
      )
    } else {
      setCoords(null)
      console.log('Geolocation is not supported by this browser.')
    }
  }
  useEffect(() => {
    getUserLocation()
  }, [])
  console.log(data, 'data , useGetWeatherQuery')

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h2">
          Weather
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} elevation={2} sx={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column: any, i: number) => (
                  <TableCell
                    key={`${column.value}+${i + 1}TableCell`}
                    align="left"
                    sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data?.list &&
                data?.list.map((row: any, i: number) => (
                  <TableRow
                    key={`${row.createdAt}+${i + 1}TableRow`}
                    role="checkbox"
                    tabIndex={-1}
                    sx={{ '&:hover': { backgroundColor: '#f3f3f3' } }}>
                    {columns.map((column: any, index: number) => (
                      <TableCell
                        key={`${row.createdAt}-${column.value}-${i + 1}-${index + 1} TableCell`}
                        align="left"
                        sx={{ maxWidth: column.minWidth }}>
                        {column.format ? column.format(row[column.value], row) : row[column.value]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default ToDoList
