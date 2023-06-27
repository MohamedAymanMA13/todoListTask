// import Test from 'redux/store/Test/resucer'
import { combineReducers } from '@reduxjs/toolkit'
import { WeatherAPI } from './ToDoList/WeatherAPI'
import ToDoListSlice from './ToDoList/ToDoListSlice'

const allReducer = combineReducers({
  [WeatherAPI.reducerPath]: WeatherAPI.reducer,
  toDoList: ToDoListSlice,
})
const rootReducer = (state: any, action: { type: string }): any => {
  const newState = { ...state }

  return allReducer(newState, action)
}
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
