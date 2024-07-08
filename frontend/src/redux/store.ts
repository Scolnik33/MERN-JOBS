import { configureStore } from "@reduxjs/toolkit";
import { jobsReducer } from "./slices/jobs";
import { authReducer } from "./slices/auth";
import { companiesReducer } from "./slices/company";

const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        auth: authReducer,
        companies: companiesReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;