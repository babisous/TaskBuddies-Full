import { useParams } from "react-router-dom";
import { useState } from "react";

import GroupTaskListUpdate from "../components/group/GroupTaskListUpdate";
import TaskFormUpdate from "../components/task/TaskFormUpdate";
import TagFormUpdate from "../components/tag/TagFormUpdate";
import GroupTaskFormUpdate from "../components/group/GroupTaskFormUpdate";
import GroupTagListUpdate from "../components/group/GroupTagListUpdate";
import GroupUpdateForm from "../components/group/GroupUpdateForm";
import GroupUserListUpdate from "../components/group/GroupUserListUpdate";

const GroupSettingsPage = () => {
	const [taskUpdated, setTaskUpdated] = useState(null);
	const [tagUpdated, setTagUpdated] = useState(null);

	console.log(taskUpdated);

	// Utilisez le hook useParams pour accéder à l'ID du groupe dans l'URL.
	const { id: groupId } = useParams();

	console.log(groupId);

	return (
		<div className="dashboardPage">
			<div className="columnComponent">
				<GroupUpdateForm />
				<GroupUserListUpdate />
			</div>
			<div className="columnComponent">
				<GroupTaskListUpdate
					setTaskUpdated={setTaskUpdated}
					groupId={groupId}
				/>
				<GroupTagListUpdate setTagUpdated={setTagUpdated} groupId={groupId} />
			</div>
			<div className="columnComponent">
				{taskUpdated && (
					<GroupTaskFormUpdate
						currentTask={taskUpdated}
						groupId={groupId}
						setCurrentTask={setTaskUpdated}
					/>
				)}
				{tagUpdated && (
					<TagFormUpdate
						currentTag={tagUpdated}
						groupId={groupId}
						setCurrentTag={setTagUpdated}
					/>
				)}
			</div>
		</div>
	);
};

export default GroupSettingsPage;
