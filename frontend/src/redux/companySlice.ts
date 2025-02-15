import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Company {
    _id?: string;
    name?: string;
    description?: string;
    website?: string;
    location?: string;
    userId?: string;
    logo?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the state interface
interface CompanyState {
    singleCompany: Company | null;
    companies:Company[];
    searchCompanyByText:string;
}

// Define initial state with correct type
const initialState: CompanyState = {
    singleCompany: null,
    companies:[],
    searchCompanyByText:"",
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setSingleCompany: (state, action: PayloadAction<Company | null>) => {
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action)=>{
            state.companies=action.payload;
        },
        setSearchCompanyByText:(state,action)=>{
            state.searchCompanyByText=action.payload;
        }
    }
});

export const { setSingleCompany,setCompanies,setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;
