import React from "react";
import { isToday } from "date-fns";
import "../../styles/Dashboard.scss";
import { taskService } from "../../services/taskService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tagIcons } from "../../utils/tagData";

import { useSelector, useDispatch } from "react-redux";
import { fetchGroupTasks } from "../../store/dashboard/task";
import {
	fetchGroupTaskUsers,
	fetchTaskUsersDateRange,
} from "../../store/dashboard/taskUser";
import { fetchTaskUsers } from "../../store/dashboard/taskUser";

const GroupTaskTile = ({ task, selectedDate, groupId, startDate, endDate }) => {
	const isTodaySelected = isToday(selectedDate);
	const { id, title, validated, tags } = task;
	const tagColor = tags && tags.length > 0 ? tags[0].color : "defaultColor";
	const tagIcon = tags && tags.length > 0 ? tagIcons[tags[0].icon] : null;

	const dispatch = useDispatch();
	const handleValidate = () => {
		if (validated) {
			taskService
				.removeTaskUser(id)
				.then(() => {
					dispatch(fetchGroupTasks([groupId]));
					dispatch(fetchTaskUsers());
					dispatch(fetchGroupTaskUsers([groupId]));
					dispatch(fetchTaskUsersDateRange({ startDate, endDate }));
				})
				.catch((error) => {
					console.error("Failed to remove task user:", error);
				});
		} else {
			taskService
				.addTaskUser(id)
				.then(() => {
					dispatch(fetchGroupTasks([groupId]));
					dispatch(fetchTaskUsers());
					dispatch(fetchGroupTaskUsers([groupId]));
					dispatch(fetchTaskUsersDateRange({ startDate, endDate }));
				})
				.catch((error) => {
					console.error("Failed to add task user:", error);
				});
		}
	};

	return (
		<div
			className={`taskTileContainer ${validated ? "validated" : ""}`}
			style={
				validated
					? { borderColor: tagColor, borderWidth: "1px", borderStyle: "solid" }
					: {}
			}
		>
			<div className={"taskTileContent"}>
				{tagIcon && (
					<FontAwesomeIcon icon={tagIcon} style={{ color: tagColor }} />
				)}
				<p style={{ color: tagColor }}>{title}</p>
			</div>
			<button
				className="taskTileButton"
				onClick={handleValidate}
				disabled={!isTodaySelected}
				style={{ borderColor: tagColor, borderWidth: 1, borderStyle: "solid" }}
			>
				{validated ? <span style={{ color: tagColor }}>✓</span> : " "}
			</button>
		</div>
	);
};

export default GroupTaskTile;
