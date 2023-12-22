import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	commentSliceActions,
	fetchCommentsByTaskUser,
} from "../../store/dashboard/comment";
import {
	taskUserSliceActions,
	fetchTaskUsersInGroupByDateRange,
} from "../../store/dashboard/taskUser";
import CommentTile from "./CommentTile";

const CommentsCenter = () => {
	const dispatch = useDispatch();

	// Récupération des TaskUsersInGroupByDateRange et des commentaires du store Redux
	const { TaskUsersInGroupByDateRange, comments } = useSelector((state) => ({
		TaskUsersInGroupByDateRange: state.taskUser.TaskUsersInGroupByDateRange,
		comments: state.comment.comments,
	}));

	// Fetch des TaskUsersInGroupByDateRange pour la semaine dernière lorsque le composant est monté
	useEffect(() => {
		const endDate = new Date();
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - 7);

		dispatch(
			fetchTaskUsersInGroupByDateRange({
				startDate: startDate,
				endDate: endDate,
			})
		);
	}, [dispatch]);

	// Fetch des commentaires lorsque les TaskUsersInGroupByDateRange changent
	useEffect(() => {
		if (TaskUsersInGroupByDateRange) {
			Object.values(TaskUsersInGroupByDateRange).forEach((taskUser) => {
				dispatch(fetchCommentsByTaskUser(taskUser.id));
			});
		}
	}, [TaskUsersInGroupByDateRange, dispatch]);

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Commentaires des 7 derniers jours 💬</p>
			</div>
			<div className="bodyContainer">
				{TaskUsersInGroupByDateRange &&
					Object.values(TaskUsersInGroupByDateRange).map((taskUser) => (
						<div key={taskUser.id}>
							{comments[taskUser.id] &&
								comments[taskUser.id].map((comment) => (
									<CommentTile
										key={comment.id}
										comment={comment}
										taskTitle={taskUser.title}
										tagColor={taskUser.tags.color}
										taskDoneAt={taskUser.doneAt}
									/>
								))}
						</div>
					))}
			</div>
		</div>
	);
};

export default CommentsCenter;
