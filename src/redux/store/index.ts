import rootReducer from 'redux/store/reducers'
import { configureStore } from '@reduxjs/toolkit'
import { WeatherAPI } from './ToDoList/WeatherAPI'

const store = configureStore({
  reducer: rootReducer, // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([WeatherAPI.middleware]),
  devTools: process.env.NODE_ENV !== 'production',
})
export default store
export type AppDispatch = typeof store.dispatch
