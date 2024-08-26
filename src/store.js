import { configureStore } from '@reduxjs/toolkit';
import { sliceReducer } from './slice';

export const store = configureStore({
    reducer: {
        movieReducer: sliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disables SerializableStateInvariantMiddleware
        }),
});
