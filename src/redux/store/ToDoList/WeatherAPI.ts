// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const WeatherAPI = createApi({
  reducerPath: 'weatherAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.openweathermap.org/data/2.5` }),
  tagTypes: ['weather', 'DashBoard'],
  endpoints: builder => ({
    getWeather: builder.query<any, any>({
      query: params => ({
        url: `/weather?lat=${params.latitude}&lon=${params.longitude}&appid=4b582beca9a97072e41eceea6a720998`,
        method: 'GET',
      }),
      providesTags: ['weather'],
    }),
    getForecast: builder.query<any, any>({
      query: params => ({
        url: `/forecast?lat=${params.latitude}&lon=${params.longitude}&cnt=15&appid=4b582beca9a97072e41eceea6a720998`,
        method: 'GET',
      }),
      providesTags: ['weather'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetWeatherQuery, useGetForecastQuery } = WeatherAPI
