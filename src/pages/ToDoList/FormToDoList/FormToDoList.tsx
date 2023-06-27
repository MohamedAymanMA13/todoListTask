import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import * as Styled from 'assets/style/Table.styled'
import Actions from 'components/Actions/Actions'
import { TextField, Checkbox, FormControlLabel, Button, Grid, Paper, Container } from '@mui/material'
import { addToDoList, editToDoList } from 'redux/store/actions'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import { RootState } from 'redux/store/reducers'

export default function FormToDoList(props: any): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const toDoList = useSelector((state: RootState) => state.toDoList.list)

  const validate = (values: any): any => {
    const errors: any = {}
    if (!values.merchantName) {
      errors.merchantName = t('validation.required')
    }
    if (!values.merchantAddress) {
      errors.merchantAddress = t('validation.required')
    }
    return errors
  }

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    checked: false,
    createdAt: dayjs().format(),
    finishedAt: null,
    archiveAt: null,
  })
  useEffect(() => {
    if (id) {
      console.log(
        toDoList.filter((x: any) => x.createdAt === id),
        'ssss',
      )
      setFormValues(toDoList.filter((x: any) => x.createdAt === id)[0])
    }
  }, [id, toDoList])
  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target
    const newValue = type === 'checkbox' ? checked : value

    setFormValues(prevValues => ({
      ...prevValues,
      [name]: newValue,
    }))
  }
  const dispatch = useDispatch()

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (!id) {
      dispatch(addToDoList({ ...formValues, createdAt: dayjs().format(), finishedAt: null, archiveAt: null }))
      navigate('/')
    } else {
      dispatch(editToDoList(formValues))
      navigate('/')
    }
  }
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formValues.checked}
                    onChange={handleInputChange}
                    color="primary"
                    name="checked"
                  />
                }
                label="Checkbox"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
