import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define UserProfile type
interface UserProfile {
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

// Define Auth State Type
interface AuthState {
  loading: boolean;
  user: UserProfile | null;
}

// Initial State
const initialState: AuthState = {
  loading: false,
  user: null,
};

// Create Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuthUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.user = action.payload;
    },
  },
});

// Export Actions & Reducer
export const { setLoading, setAuthUser } = authSlice.actions;
export default authSlice.reducer;
