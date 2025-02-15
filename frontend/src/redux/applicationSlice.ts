import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Define the interface for the `Job` model

// Define the interface for the `User` (Applicant)
interface User {
  _id?: string;
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  profile?: {
    bio?: string;
    skills?: string[];
    resume?: File | null;
    resumeOriginalName?: string;
    profilePhoto?: string;
  };
}

// Define the interface for an `Application`
interface Application {
  _id: string; // Reference to Job model
  applicant: User; // Reference to User model
  status: "Pending" | "Accepted" | "Rejected"; // Application status
  createdAt: Date;
  updatedAt: Date;
}

// Define the state structure for storing applications
interface ApplicationState {
  application: Application[]; // Array of applications
}
// Initial state
const initialState: ApplicationState = {
  application: [],
};

// Define the Redux slice for application state
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplication: (state, action: PayloadAction<Application[]>) => {
      state.application = action.payload; // Set the list of applicants (applications)
    },
  },
});

// Export the action and reducer
export const { setApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
