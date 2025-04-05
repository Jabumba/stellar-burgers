// import { addTask, deleteTask, loadTasks } from './actions';
// import { createSlice, createSelector } from '@reduxjs/toolkit';
// import { TTask } from '../../utils/types';

// type TTasksState = {
//     tasks: TTask[];
//     loading: boolean;
//     error: string;
// }

// export const initialState: TTasksState = {
//     tasks: [],
//     loading: false,
//     error: ''
// }

// export const tasksSlice = createSlice({
//     name: 'tasks',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(addTask.fulfilled, (state, action) => {
//                 state.tasks.push(action.payload);
//             })
//             .addCase(deleteTask.fulfilled, (state, action) => {
//                 state.tasks = state.tasks.filter(task => task.id !== action.payload);
//             })
//             .addCase(loadTasks.pending, (state) => {
//                 state.loading = true;
//                 state.error = '';
//             })
//             .addCase(loadTasks.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(loadTasks.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.tasks = action.payload;
//             })
//     },
//     selectors: {
//         getTasks: state => state.tasks,
//         getLoadingStatus: state => state.loading,
//         getError: state => state.error
//     }
// })

// export const { getTasks, getLoadingStatus, getError } = tasksSlice.selectors;