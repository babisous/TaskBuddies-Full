import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./dashboard/task";
import tagSlice from "./dashboard/tag";
import groupSlice from "./dashboard/group";
import taskUserSlice from "./dashboard/taskUser";
import commentSlice from "./dashboard/comment";

const store = configureStore({
	reducer: {
		task: taskSlice.reducer,
		tag: tagSlice.reducer,
		group: groupSlice.reducer,
		taskUser: taskUserSlice.reducer,
		comment: commentSlice.reducer,
	},
});

export default store;
