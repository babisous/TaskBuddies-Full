// dashboard/group.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { groupService } from "../../services/groupService";

// Actions asynchrones
export const fetchMemberGroups = createAsyncThunk(
	"group/fetchMemberGroups",
	async (_, { rejectWithValue }) => {
		try {
			const response = await groupService.fetchGroupsByUser();
			return response;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const fetchCreatedGroups = createAsyncThunk(
	"group/fetchCreatedGroups",
	async (_, { rejectWithValue }) => {
		try {
			const response = await groupService.fetchGroupsByCreator();
			return response;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const createGroup = createAsyncThunk(
	"group/createGroup",
	async (groupName, { rejectWithValue }) => {
		try {
			const response = await groupService.createGroup(groupName);
			return response;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

// Action asynchrone
export const fetchUserGroups = createAsyncThunk(
	"group/fetchUserGroups",
	async (_, { rejectWithValue }) => {
		try {
			const response = await groupService.fetchGroupsByUser();
			return response;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

// Slice
const groupSlice = createSlice({
	name: "group",
	initialState: {
		memberGroups: [],
		createdGroups: [],
		userGroups: [],
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMemberGroups.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchMemberGroups.fulfilled, (state, action) => {
				state.status = "idle";
				state.memberGroups = action.payload.filter(
					(group) =>
						!state.createdGroups.some(
							(createdGroup) => createdGroup.id === group.id
						)
				);
			})
			.addCase(fetchMemberGroups.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			})
			.addCase(fetchCreatedGroups.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCreatedGroups.fulfilled, (state, action) => {
				state.status = "idle";
				state.createdGroups = action.payload;
			})
			.addCase(fetchCreatedGroups.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			})
			.addCase(createGroup.fulfilled, (state, action) => {
				state.status = "idle";
				state.createdGroups.push(action.payload);
			})
			.addCase(fetchUserGroups.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchUserGroups.fulfilled, (state, action) => {
				state.status = "idle";
				state.userGroups = action.payload; // Pas de filtre ici
			})
			.addCase(fetchUserGroups.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			});
	},
});

export const groupSliceActions = groupSlice.actions;
export default groupSlice;
