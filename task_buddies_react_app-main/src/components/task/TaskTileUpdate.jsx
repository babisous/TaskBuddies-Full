import React, { useState } from "react";

import "../../styles/Dashboard.scss";
import { taskService } from "../../services/taskService";

import { useSelector, useDispatch } from "react-redux";
import TaskFormUpdate from "./TaskFormUpdate";

import { fetchAllPersonnalTasks } from "../../store/dashboard/task";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const TaskTileUpdate = ({ task, setTaskUpdated }) => {
	const { id, title, tags } = task;

	const dispatch = useDispatch();

	const handleValidate = () => {
		console.log(id);
		setTaskUpdated(task);
	};

	const handleDelete = async () => {
		try {
			await taskService.removeTask(id);
			dispatch(fetchAllPersonnalTasks());
			console.log("delete");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={`taskTileContainer `}>
			<p style={{ color: tags && tags[0] ? tags[0].color : "default" }}>
				{title}
			</p>

			<div className="groupIcons">
				<FontAwesomeIcon icon={faPen} onClick={handleValidate} />
				<FontAwesomeIcon icon={faTrashAlt} onClick={handleDelete} />
			</div>
		</div>
	);
};

export default TaskTileUpdate;
