import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

export interface ItoDo {
  title: string
  description: string
  checked: boolean
  createdAt: string
  finishedAt: string | null
  archiveAt: string | null
}
export interface ItoDoListSlice {
  list: ItoDo[]
}
const initialState: ItoDoListSlice = {
  list: [
    {
      title: 'Mohammed',
      description: 'Hello world',
      checked: false,
      createdAt: '5pm',
      finishedAt: '10pm',
      archiveAt: 'x',
    },
  ],
}

export const ToDoListSlice = createSlice({
  name: 'toDoList',
  initialState,
  reducers: {
    addToDoList: (state, action: PayloadAction<ItoDo>) => {
      console.log(action.payload, 'action.payload')
      state.list = [...state.list, action.payload]
    },
    deleteToDoList: (state, action: PayloadAction<ItoDo>) => {
      state.list = state.list.filter((x: ItoDo) => x.createdAt !== action.payload.createdAt)
    },
    editToDoList: (state, action: PayloadAction<ItoDo>) => {
      const indexof = state.list.findIndex((x: ItoDo) => x.createdAt === action.payload.createdAt)
      state.list[indexof] = action.payload
    },
    archiveToDoList: (state, action: PayloadAction<ItoDo>) => {
      const indexof = state.list.findIndex((x: ItoDo) => x.createdAt === action.payload.createdAt)
      state.list[indexof] = { ...action.payload, archiveAt: dayjs().format() }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToDoList, editToDoList, deleteToDoList, archiveToDoList } = ToDoListSlice.actions

export default ToDoListSlice.reducer
