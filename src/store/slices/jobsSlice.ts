import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Job } from '../../types';

const API_URL = 'http://localhost:3001/api';

interface JobsState {
  jobs: Job[];
  filteredJobs: Job[];
  recommendedJobs: Job[];
  jobDetail: Job | null;
  loading: boolean;
  error: string | null;
  filters: {
    location: string[];
    jobType: string[];
    skillLevel: string[];
  };
}

const initialState: JobsState = {
  jobs: [],
  filteredJobs: [],
  recommendedJobs: [],
  jobDetail: null,
  loading: false,
  error: null,
  filters: {
    location: [],
    jobType: [],
    skillLevel: [],
  },
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs');
  }
});

export const fetchRecommendedJobs = createAsyncThunk(
  'jobs/fetchRecommendedJobs',
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

      const response = await axios.get(`${API_URL}/jobs/recommended`, config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch recommended jobs');
    }
  }
);

export const fetchJobDetail = createAsyncThunk(
  'jobs/fetchJobDetail',
  async (jobId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/${jobId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch job details');
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      
      // Apply filters
      state.filteredJobs = state.jobs.filter((job) => {
        const { location, jobType, skillLevel } = state.filters;
        
        const locationMatch = location.length === 0 || location.includes(job.location);
        const typeMatch = jobType.length === 0 || jobType.includes(job.type);
        
        // Assuming job has a skillLevel field or derive it from requirements
        const jobSkillLevel = job.requirements.some(req => req.includes('senior')) 
          ? 'advanced' 
          : job.requirements.some(req => req.includes('experience')) 
            ? 'intermediate' 
            : 'beginner';
            
        const skillMatch = skillLevel.length === 0 || skillLevel.includes(jobSkillLevel);
        
        return locationMatch && typeMatch && skillMatch;
      });
    },
    clearFilters: (state) => {
      state.filters = {
        location: [],
        jobType: [],
        skillLevel: [],
      };
      state.filteredJobs = state.jobs;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.filteredJobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRecommendedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendedJobs = action.payload;
      })
      .addCase(fetchRecommendedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchJobDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.jobDetail = action.payload;
      })
      .addCase(fetchJobDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters } = jobsSlice.actions;
export default jobsSlice.reducer;