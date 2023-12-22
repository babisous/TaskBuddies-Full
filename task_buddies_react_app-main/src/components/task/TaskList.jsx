import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import TaskTile from "./TaskTile";
import TagList from "../tag/TagList";
import GroupTaskTile from "../group/GroupTaskTile";

import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, taskSliceActions } from "../../store/dashboard/task";
import { fetchGroupTasks } from "../../store/dashboard/task";
import { fetchUserGroups } from "../../store/dashboard/group";

import TaskForm from "../task/TaskForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const TaskList = ({ startDate, endDate }) => {
	const dispatch = useDispatch();
	const { tasks, status, error } = useSelector((state) => state.task);
	const { groupTasks } = useSelector((state) => state.task);
	const { userGroups } = useSelector((state) => state.group);
	const selectedDateStr = useSelector((state) => state.task.selectedDate);
	const selectedDate = new Date(selectedDateStr);

	const selectedTags = useSelector((state) => state.task.selectedTags);

	const [showForm, setShowForm] = useState(false);

	const handleButtonClick = () => {
		setShowForm(true);
	};

	const handleBackClick = () => {
		setShowForm(false);
	};

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch, selectedTags]);

	useEffect(() => {
		const groupIds = userGroups.map((group) => group.id);
		dispatch(fetchGroupTasks(groupIds));
	}, [dispatch, userGroups, selectedDateStr, selectedTags]); // Ajoutez selectedTags ici

	// Utilisez useEffect pour déclencher le fetch des tâches lorsque le composant est monté.
	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

	useEffect(() => {
		const groupIds = userGroups.map((group) => group.id);
		dispatch(fetchGroupTasks(groupIds));
	}, [dispatch, userGroups, selectedDateStr]); // Ajoutez selectedDateStr ici

	// Lorsque vous voulez modifier la date sélectionnée, convertissez la nouvelle Date en chaîne de caractères ISO.
	const handleDateChange = (newDate) => {
		dispatch(taskSliceActions.setSelectedDate(newDate.toISOString()));
	};

	const handleTagClickFilter = (tagId) => {
		let newSelectedTags;

		if (selectedTags.includes(tagId)) {
			newSelectedTags = selectedTags.filter((id) => id !== tagId);
		} else {
			newSelectedTags = [...selectedTags, tagId];
		}

		dispatch(taskSliceActions.setSelectedTags(newSelectedTags));
	};

	if (showForm) {
		return <TaskForm handleBackClick={handleBackClick} />;
	}

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Tâches à réaliser 💪</p>
				<button className="headerBtn" onClick={handleButtonClick}>
					<FontAwesomeIcon icon={faPlusCircle} />
				</button>
			</div>
			<TagList handleAction={handleTagClickFilter} />
			<div className="bodyContainer">
				{tasks.map((task) => (
					<TaskTile
						key={task.id}
						task={task}
						selectedDate={selectedDate}
						startDate={startDate}
						endDate={endDate}
					/>
				))}
				{userGroups.map(
					(group) =>
						groupTasks[group.id]?.length > 0 && (
							<div key={group.id}>
								<p>{group.name}</p>
								{groupTasks[group.id].map((task) => (
									<GroupTaskTile
										key={task.id}
										task={task}
										selectedDate={selectedDate}
										groupId={group.id}
										startDate={startDate}
										endDate={endDate}
									/>
								))}
							</div>
						)
				)}
			</div>
		</div>
	);
};

export default TaskList;
