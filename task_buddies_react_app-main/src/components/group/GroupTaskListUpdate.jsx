import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TaskTileUpdate from "../task/TaskTileUpdate";
import { fetchAllTasksByGroup } from "../../store/dashboard/task";

const TaskListUpdate = ({ setTaskUpdated, groupId }) => {
	const dispatch = useDispatch();

	const tasks = useSelector((state) => state.task.allGroupTasks);

	useEffect(() => {
		dispatch(fetchAllTasksByGroup(groupId));
	}, [dispatch, groupId]);

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Liste des tâches :</p>
			</div>
			<div className="bodyContainer">
				{tasks.map((task) => (
					<TaskTileUpdate
						key={task.id}
						task={task}
						setTaskUpdated={setTaskUpdated}
					/>
				))}
			</div>
		</div>
	);
};

export default TaskListUpdate;
