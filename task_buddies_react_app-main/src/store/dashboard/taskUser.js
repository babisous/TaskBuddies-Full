import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskService } from "../../services/taskService";

export const fetchTaskUsers = createAsyncThunk(
	"taskUser/fetchTaskUsers",
	async (_, { getState, rejectWithValue }) => {
		const { selectedDate } = getState().task;
		try {
			const fetchedTaskUsers = await taskService.fetchTaskUsersByDate(
				new Date(selectedDate)
			);
			return fetchedTaskUsers;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const fetchTaskUsersDateRange = createAsyncThunk(
	"taskUser/fetchTaskUsersDateRange",
	async ({ startDate, endDate }, { rejectWithValue }) => {
		try {
			const fetchedTaskUsers = await taskService.fetchTaskUsersDateRange(
				startDate.toISOString(),
				endDate.toISOString()
			);
			return fetchedTaskUsers;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const fetchGroupTaskUsers = createAsyncThunk(
	"taskUser/fetchGroupTaskUsers",
	async (groupIds, { getState, rejectWithValue }) => {
		const { selectedDate } = getState().task;
		try {
			const groupTaskUsersObj = {};
			await Promise.all(
				groupIds.map(async (groupId) => {
					const fetchedTaskUsers =
						await taskService.fetchTaskUsersByGroupAndDate(
							groupId,
							new Date(selectedDate)
						);
					groupTaskUsersObj[groupId] = fetchedTaskUsers;
				})
			);
			return groupTaskUsersObj;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const fetchTaskUsersInGroupByDateRange = createAsyncThunk(
	"taskUser/fetchTaskUsersInGroupByDateRange",
	async ({ startDate, endDate }, { getState, rejectWithValue }) => {
		try {
			const fetchedTaskUsers =
				await taskService.fetchTaskUsersInGroupByDateRange(
					startDate.toISOString(),
					endDate.toISOString()
				);
			return fetchedTaskUsers;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const fetchCountTaskUsersByGroupAndUserOnDateRange = createAsyncThunk(
	"taskUser/fetchCountTaskUsersByGroupAndUserOnDateRange",
	async ({ groupId, userId, startDate, endDate }, { rejectWithValue }) => {
		try {
			const count =
				await taskService.fetchCountTaskUsersByGroupAndUserOnDateRange(
					groupId,
					userId,
					startDate.toISOString(),
					endDate.toISOString()
				);
			return count;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

const taskUserSlice = createSlice({
	name: "taskUser",
	initialState: {
		taskUsers: {},
		groupTaskUsers: {},
		taskUsersDateRange: {},
		TaskUsersInGroupByDateRange: {},
		countTaskUsersByUser: {},
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTaskUsers.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchTaskUsers.fulfilled, (state, action) => {
				state.status = "idle";
				state.taskUsers = action.payload;
			})
			.addCase(fetchTaskUsers.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			})
			.addCase(fetchTaskUsersDateRange.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchTaskUsersDateRange.fulfilled, (state, action) => {
				state.status = "idle";
				state.taskUsersDateRange = action.payload;
			})
			.addCase(fetchTaskUsersDateRange.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			})
			.addCase(fetchGroupTaskUsers.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchGroupTaskUsers.fulfilled, (state, action) => {
				state.status = "idle";
				state.groupTaskUsers = { ...state.groupTaskUsers, ...action.payload };
			})
			.addCase(fetchGroupTaskUsers.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			})

			//fetchTaskUsersInGroupByDateRange
			.addCase(fetchTaskUsersInGroupByDateRange.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchTaskUsersInGroupByDateRange.fulfilled, (state, action) => {
				state.status = "idle";
				state.TaskUsersInGroupByDateRange = action.payload;
			})
			.addCase(fetchTaskUsersInGroupByDateRange.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			})

			.addCase(
				fetchCountTaskUsersByGroupAndUserOnDateRange.pending,
				(state) => {
					state.status = "loading";
				}
			)
			.addCase(
				fetchCountTaskUsersByGroupAndUserOnDateRange.fulfilled,
				(state, action) => {
					state.status = "idle";
					state.countTaskUsersByUser[action.meta.arg.userId] = action.payload;
				}
			)
			.addCase(
				fetchCountTaskUsersByGroupAndUserOnDateRange.rejected,
				(state, action) => {
					state.status = "idle";
					state.error = action.error.message;
				}
			);
	},
});

export const taskUserSliceActions = taskUserSlice.actions;
export default taskUserSlice;
