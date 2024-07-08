import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "../../axios";
import { JobsType } from "../../types/JobsType";
import { FormCreateValues } from "../../types/FormType";

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface JobsSliceState {
    jobs: {
        items: JobsType[],
        status: Status
    }
}

export const fetchJobs = createAsyncThunk<JobsType[], string>('jobs/fetchJobs', async (queryString) => {
    const { data } = await axios.get<JobsType[]>(`/getAll?${queryString}`);

    return data;
})

export const fetchMyJobs = createAsyncThunk('jobs/fetchMyJobs', async () => {
    const { data } = await axios.get<JobsType[]>('/getmyjobs');

    return data as JobsType[];
})

export const fetchFavoritiesJobs = createAsyncThunk('jobs/fetchFavoritiesJobs', async () => {
    const { data } = await axios.get<JobsType[]>('/getFavorite');

    return data as JobsType[];
})

export const fetchCreate = createAsyncThunk<JobsType[], FormCreateValues>('jobs/fetchCreate', async (params) => {
    const { data } = await axios.post<JobsType[]>('/create', params);

    return data;
});

const initialState: JobsSliceState = {
    jobs: {
        items: [],
        status: Status.LOADING
    }
}

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchJobs.pending, (state) => {
            state.jobs.items = [];
            state.jobs.status = Status.LOADING;
        }),
        builder.addCase(fetchJobs.fulfilled, (state, action: PayloadAction<JobsType[]>) => {
            state.jobs.items = action.payload;
            state.jobs.status = Status.SUCCESS;
        }),
        builder.addCase(fetchJobs.rejected, (state) => {
            state.jobs.items = [];
            state.jobs.status = Status.ERROR;
        }),
        builder.addCase(fetchMyJobs.pending, (state) => {
            state.jobs.items = [];
            state.jobs.status = Status.LOADING;
        }),
        builder.addCase(fetchMyJobs.fulfilled, (state, action: PayloadAction<JobsType[]>) => {
            state.jobs.items = action.payload;
            state.jobs.status = Status.SUCCESS;
        }),
        builder.addCase(fetchMyJobs.rejected, (state) => {
            state.jobs.items = [];
            state.jobs.status = Status.ERROR;
        }),
        builder.addCase(fetchFavoritiesJobs.pending, (state) => {
            state.jobs.items = [];
            state.jobs.status = Status.LOADING;
        }),
        builder.addCase(fetchFavoritiesJobs.fulfilled, (state, action: PayloadAction<JobsType[]>) => {
            state.jobs.items = action.payload;
            state.jobs.status = Status.SUCCESS;
        }),
        builder.addCase(fetchFavoritiesJobs.rejected, (state) => {
            state.jobs.items = [];
            state.jobs.status = Status.ERROR;
        }),
        builder.addCase(fetchCreate.pending, (state) => {
            state.jobs.items = [];
            state.jobs.status = Status.LOADING;
        }),
        builder.addCase(fetchCreate.fulfilled, (state, action: PayloadAction<JobsType[]>) => {
            state.jobs.items = action.payload;
            state.jobs.status = Status.SUCCESS;
        }),
        builder.addCase(fetchCreate.rejected, (state) => {
            state.jobs.items = [];
            state.jobs.status = Status.ERROR;
        })
    }
});

export const selectJobs = (state: RootState) => state.jobs.jobs;

export const jobsReducer = jobsSlice.reducer;