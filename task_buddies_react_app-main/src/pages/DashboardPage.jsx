import React, { useState } from "react";
import TaskList from "../components/task/TaskList";
import TaskForm from "../components/task/TaskForm";
import TagForm from "../components/tag/TagForm";
import GroupForm from "../components/group/GroupForm";
import GroupList from "../components/group/GroupList";
import GroupJoin from "../components/group/GroupJoin";
import DayDoughnut from "../components/charts/DayDoughnut";
import CommentsCenter from "../components/group/CommentsCenter";

import StatLine from "../components/charts/StatLine";

import FetchTaskUsersLastWeek from "../components/charts/FetchTaskUsersLastWeek";

import "../styles/Dashboard.scss";

const DashboardPage = () => {
	const [showList, setShowList] = useState(true);
	const [showJoinForm, setShowJoinForm] = useState(false);
	const [showCreateForm, setShowCreateForm] = useState(false);

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const handleListClick = () => {
		setShowList(true);
		setShowJoinForm(false);
		setShowCreateForm(false);
	};

	const handleJoinClick = () => {
		setShowList(false);
		setShowJoinForm(true);
		setShowCreateForm(false);
	};

	const handleCreateClick = () => {
		setShowList(false);
		setShowJoinForm(false);
		setShowCreateForm(true);
	};
	return (
		<div className="dashboardPage">
			<div className="columnComponent" id="firstColumn">
				<TaskList startDate={startDate} endDate={endDate} />
			</div>
			<div className="columnComponent" id="secondColumn">
				{showJoinForm && (
					<GroupJoin
						handleCreateClick={handleCreateClick}
						handleJoinClick={handleJoinClick}
						handleListClick={handleListClick}
					/>
				)}
				{showCreateForm && (
					<GroupForm
						handleCreateClick={handleCreateClick}
						handleJoinClick={handleJoinClick}
						handleListClick={handleListClick}
					/>
				)}
				{showList && (
					<GroupList
						handleCreateClick={handleCreateClick}
						handleJoinClick={handleJoinClick}
						handleListClick={handleListClick}
					/>
				)}
				<DayDoughnut />
			</div>

			<div className="columnComponent" id="thirdColumn">
				<CommentsCenter />
				<StatLine setStartDate={setStartDate} setEndDate={setEndDate} />
			</div>
		</div>
	);
};

export default DashboardPage;
