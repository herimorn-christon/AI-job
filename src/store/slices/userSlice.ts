import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User, Skill, Education, Experience } from '../../types';

const API_URL = 'http://localhost:3001/api';

interface UserState {
  profile: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      
      if (!token) {
        return rejectWithValue('Authentication required');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${API_URL}/users/profile`, config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: Partial<User>, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      
      if (!token) {
        return rejectWithValue('Authentication required');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(`${API_URL}/users/profile`, profileData, config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const addSkill = createAsyncThunk(
  'user/addSkill',
  async (skillData: Partial<Skill>, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      
      if (!token) {
        return rejectWithValue('Authentication required');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`${API_URL}/users/skills`, skillData, config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add skill');
    }
  }
);

export const addEducation = createAsyncThunk(
  'user/addEducation',
  async (educationData: Partial<Education>, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      
      if (!token) {
        return rejectWithValue('Authentication required');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`${API_URL}/users/education`, educationData, config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add education');
    }
  }
);

export const addExperience = createAsyncThunk(
  'user/addExperience',
  async (experienceData: Partial<Experience>, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      
      if (!token) {
        return rejectWithValue('Authentication required');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`${API_URL}/users/experience`, experienceData, config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add experience');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.skills = [...state.profile.skills, action.payload];
        }
      })
      .addCase(addEducation.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.education = [...state.profile.education, action.payload];
        }
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.experience = [...state.profile.experience, action.payload];
        }
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;