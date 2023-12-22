import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchMemberGroups,
	fetchCreatedGroups,
} from "../../store/dashboard/group";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPeopleGroup,
	faPersonCirclePlus,
	faPenToSquare,
	faCrown, // Importez l'icône de la couronne
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/Dashboard.scss";

const GroupList = ({ handleCreateClick, handleJoinClick, handleListClick }) => {
	const dispatch = useDispatch();
	const { memberGroups, createdGroups, status, error } = useSelector(
		(state) => state.group
	);

	useEffect(() => {
		dispatch(fetchMemberGroups());
		dispatch(fetchCreatedGroups());
	}, [dispatch]);

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Groupes 💡</p>
				<div className="groupIcons">
					<button className="headerBtn" onClick={handleListClick}>
						<FontAwesomeIcon icon={faPeopleGroup} />
					</button>
					<button className="headerBtn" onClick={handleJoinClick}>
						<FontAwesomeIcon icon={faPersonCirclePlus} />
					</button>
					<button className="headerBtn" onClick={handleCreateClick}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</div>
			</div>
			<div className="bodyContainer">
				{memberGroups.length > 0 &&
					memberGroups.map((group) => (
						<div key={group.id} className="tileContainer">
							<Link to={`/group/${group.id}`}>{group.name}</Link>
						</div>
					))}
				{createdGroups.length > 0 &&
					createdGroups.map((group) => (
						<div key={group.id} className="tileContainer">
							<Link to={`/group/${group.id}`}>{group.name}</Link>
							<FontAwesomeIcon icon={faCrown} />{" "}
						</div>
					))}
			</div>
		</div>
	);
};

export default GroupList;
