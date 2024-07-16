import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Timers {
    title: string;
    time: string;
}

export interface TimerList {
    listTimers: Timers[]
}

const initialState: TimerList = {
   listTimers: []
}

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        addList: (state, action: PayloadAction<Timers>) => {
            state.listTimers.push(action.payload)
        }
    },
})

export const { addList } = timerSlice.actions

export default timerSlice.reducer