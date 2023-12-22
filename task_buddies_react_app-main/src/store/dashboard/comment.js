// src/store/comment.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { groupService } from "../../services/groupService";

export const fetchCommentsByTaskUser = createAsyncThunk(
	"comment/fetchCommentsByTaskUser",
	async (taskUserId, { rejectWithValue }) => {
		try {
			const comments = await groupService.fetchCommentsByTaskUser(taskUserId);
			return comments;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

const commentSlice = createSlice({
	name: "comment",
	initialState: {
		comments: {},
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCommentsByTaskUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCommentsByTaskUser.fulfilled, (state, action) => {
				state.status = "idle";
				state.comments[action.meta.arg] = action.payload;
			})
			.addCase(fetchCommentsByTaskUser.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			});
	},
});

export const commentSliceActions = commentSlice.actions;
export default commentSlice;
