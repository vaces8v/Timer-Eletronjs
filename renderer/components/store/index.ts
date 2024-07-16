import { configureStore } from '@reduxjs/toolkit';
import sliceTimers from './timer.slice';

export const store = configureStore({
    reducer: {
        timerStore: sliceTimers,
    },
});
