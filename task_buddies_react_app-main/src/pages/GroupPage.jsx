import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { groupService } from "../services/groupService";
import UserList from "../components/group/UserList";
import GroupTaskForm from "../components/group/GroupTaskForm";
import GroupTaskList from "../components/group/GroupTaskList";
import GroupTaskUserList from "../components/group/GroupTaskUserList";
import GroupTagForm from "../components/tag/GroupTagForm";
import "../styles/Dashboard.scss";
import GroupTagList from "../components/tag/GroupTagList";
import GroupTagListForForm from "../components/tag/GroupTagListForForm";
import UserRankingList from "../components/group/UserRankingList";
import GroupInfos from "../components/group/GroupInfos";

const GroupPage = () => {
	const { id } = useParams();
	const [group, setGroup] = useState(null);

	useEffect(() => {
		groupService.fetchGroupById(id).then((group) => setGroup(group));
	}, [id]);

	if (!group) {
		return <div>Chargement...</div>;
	}

	console.log(group);

	return (
		<div className="dashboardPage">
			<div className="columnComponent">
				<GroupInfos group={group} />
				<UserRankingList users={group.users} groupId={id} />
			</div>

			<div className="columnComponent">
				<GroupTaskList authorId={group.createdBy.id} groupId={id} />
			</div>

			<div className="columnComponent" id="">
				<GroupTaskUserList groupId={id} />
				<UserList
					users={group.users}
					createdBy={group.createdBy}
					groupId={id}
				/>
			</div>

			{/* <GroupTaskForm groupId={id} />
			<GroupTagForm groupId={id} /> */}
		</div>
	);
};

export default GroupPage;
