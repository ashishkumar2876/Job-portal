import { UserProfile } from "@/components/UpdateProfileDialog";
import { createSlice } from "@reduxjs/toolkit";
interface Company {
    name: string;
    location: string;
    logo: string;
  }
  interface Application {
    _id: string;
    job: Job;
    applicant: UserProfile; // Include the full applicant details (You can use the `UserProfile` interface you defined earlier)
    status: string;
    createdAt: Date;
  }
  
  interface Job {
    _id: string;
    title: string;
    description:string;
    requirements:string[];
    experienceLevel: number;
    company: Company;
    location: string;
    position: number;
    jobType: string;
    salary: string;
    applications: Application[];
    createdAt: Date
  }
  
interface JobState {
  allJobs: Job[];
  allAdminJobs: Job[];
  singleJob:Job | null// Explicitly define this as an array of Job objects
  searchJobByText:string,
  allAppliedJobs:Application[],
  searchQuery: string

}
const initialState: JobState = {
  allJobs: [],
  allAdminJobs: [],
  singleJob:null, // Ensure it's initialized properly
  searchJobByText:"",
  allAppliedJobs:[],
  searchQuery:""
};
const jobSlice = createSlice({
  name: "job",
  initialState: initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob:(state,action)=>{
      state.singleJob=action.payload;
    },
    setAllAdminJobs:(state,action)=>{
      state.allAdminJobs=action.payload;
    },
    setSearchJobByText:(state,action)=>{
      state.searchJobByText=action.payload;
    },
    setAllAppliedJobs: (state,action)=>{
      state.allAppliedJobs=action.payload;
    },
    setSearchQuery: (state,action)=>{
      state.searchQuery=action.payload;
    }
  },
});
export const { setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;
