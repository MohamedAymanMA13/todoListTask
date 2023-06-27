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
  Button,
  Typography,
  Grid,
} from '@mui/material'
import Actions from 'components/Actions/Actions'
import { deleteToDoList, archiveToDoList, useGetWeatherQuery } from 'redux/store/actions'
import { RootState } from 'redux/store/reducers'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { styled } from '@mui/system'

function ToDoList(): JSX.Element {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const toDoList = useSelector((state: RootState) => state.toDoList.list)
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null)
  const { data } = useGetWeatherQuery(coords || skipToken)
  const columns = [
    { value: 'title', label: 'Title', minWidth: 170 },
    { value: 'description', label: 'Description', minWidth: 170 },
    { value: 'checked', label: 'Checked', minWidth: 100 },
    { value: 'createdAt', label: 'Created At', minWidth: 100 },
    { value: 'finishedAt', label: 'Finished At', minWidth: 100 },
    { value: 'archiveAt', label: 'Archive At', minWidth: 100 },
    {
      value: 'createdAt',
      label: 'Actions',
      minWidth: 100,
      // eslint-disable-next-line react/no-unstable-nested-components
      format: (createdAt: string, row: any) => {
        return (
          <Actions
            editLink={`/edit/${createdAt}`}
            delete={{
              handleDelete: (x: any) => {
                return dispatch(deleteToDoList(row))
              },
            }}
            archive={{
              handleArchive: (x: any) => {
                return dispatch(archiveToDoList(row))
              },
            }}
          />
        )
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

  const WeatherLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    margin-bottom: 16px;
  `

  return (
    <div>
      <Link to="/add">
        <Button variant="contained">{t('Add Item')}</Button>
      </Link>
      <Grid container spacing={2} justifyContent="center">
        <WeatherLink to="/forecast">
          The Weather Now is {data?.main.temp && Math.round(data.main.temp - 273.15)}°C
        </WeatherLink>
      </Grid>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
            {toDoList &&
              toDoList.map((row: any, i: number) => (
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
    </div>
  )
}

export default ToDoList
