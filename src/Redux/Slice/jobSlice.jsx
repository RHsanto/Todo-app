import { createSlice } from "@reduxjs/toolkit";

const initialJob = {
  jobs: JSON.parse(localStorage.getItem("jobList")) || [],
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: initialJob,
  reducers: {
    showJobs: state => state,
    addJobs: (state, action) => {
      state.jobs.push(action.payload);
      localStorage.setItem("jobList", JSON.stringify(state.jobs));
    },

    updateJobs: (state, action) => {
      const { id, title, desc, priority } = action.payload;

      const jobToUpdate = state.jobs.find(job => job.id === id);

      if (jobToUpdate) {
        jobToUpdate.title = title;
        jobToUpdate.desc = desc;
        jobToUpdate.priority = priority;
      }
      localStorage.setItem("jobList", JSON.stringify(state.jobs));
    },
    deleteJobs: (state, action) => {
      const jobId = action.payload;
      state.jobs = state.jobs.filter(job => job.id !== jobId);
      localStorage.setItem("jobList", JSON.stringify(state.jobs));
    },

    completeTask: (state, action) => {
      const jobId = action.payload;
      const jobToCompleteIndex = state.jobs.findIndex(job => job.id === jobId);
      if (jobToCompleteIndex !== -1) {
        const completedJob = {
          ...state.jobs[jobToCompleteIndex],
          completedOn: new Date().toLocaleDateString("en-GB").split("T")[0],
        };
        state.jobs[jobToCompleteIndex] = completedJob;
      }
      localStorage.setItem("jobList", JSON.stringify(state.jobs));
    },
  },
});

export const { showJobs, addJobs, deleteJobs, updateJobs, completeTask } = jobsSlice.actions;

export default jobsSlice.reducer;
