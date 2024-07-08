import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { RootState } from "../store";
import { CompamiesType } from "../../types/CompaniesType";

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface CompaniesSLiceState {
    companies: {
        itemsCompanies: CompamiesType[],
        statusCompanies: Status
    }
}

export const fetchCompanies = createAsyncThunk<CompamiesType[], string>('companies/fetchCompanies', async (queryString) => {
    const { data } = await axios.get<CompamiesType[]>(`/getCompanies?${queryString}`);

    return data;
});

export const fetchCreateCompany = createAsyncThunk<CompamiesType[], Record<string, string>>('companies/fetchCreateCompany', async (params) => {
    const { data } = await axios.post<CompamiesType[]>('/createCompany', params);

    return data;
});

const initialState: CompaniesSLiceState = {
    companies: {
        itemsCompanies: [],
        statusCompanies: Status.LOADING
    }
}

const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCompanies.pending, (state) => {
            state.companies.itemsCompanies = [];
            state.companies.statusCompanies = Status.LOADING;
        }),
        builder.addCase(fetchCompanies.fulfilled, (state, action: PayloadAction<CompamiesType[]>) => {
            state.companies.itemsCompanies = action.payload;
            state.companies.statusCompanies = Status.SUCCESS;
        }),
        builder.addCase(fetchCompanies.rejected, (state) => {
            state.companies.itemsCompanies = [];
            state.companies.statusCompanies = Status.ERROR;
        }),
        builder.addCase(fetchCreateCompany.pending, (state) => {
            state.companies.itemsCompanies = [];
            state.companies.statusCompanies = Status.LOADING;
        }),
        builder.addCase(fetchCreateCompany.fulfilled, (state, action: PayloadAction<CompamiesType[]>) => {
            state.companies.itemsCompanies = action.payload;
            state.companies.statusCompanies = Status.SUCCESS;
        }),
        builder.addCase(fetchCreateCompany.rejected, (state) => {
            state.companies.itemsCompanies = [];
            state.companies.statusCompanies = Status.ERROR;
        })
    }
})

export const selectCompanies = (state: RootState) => state.companies.companies;

export const companiesReducer = companiesSlice.reducer; 