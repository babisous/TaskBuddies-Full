import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreatedGroups, createGroup } from "../../store/dashboard/group";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPeopleGroup,
	faPersonCirclePlus,
	faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const GroupForm = ({ handleCreateClick, handleJoinClick, handleListClick }) => {
	const dispatch = useDispatch();
	const { status, error } = useSelector((state) => state.group);
	const [groupName, setGroupName] = useState("");

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			await dispatch(createGroup(groupName));
			dispatch(fetchCreatedGroups());
		} catch (error) {
			console.error("Erreur lors de la création du groupe :", error);
		}
	};

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Créer un groupe 💡</p>
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
			<form className="bodyContainer" onSubmit={handleFormSubmit}>
				<div className="inputContainer">
					<label htmlFor="groupName">Nom du groupe</label>
					<input
						type="text"
						id="groupName"
						value={groupName}
						onChange={(event) => setGroupName(event.target.value)}
						placeholder="Nom du groupe"
						required
					/>
				</div>
				<div className="inputContainer">
					<button type="submit" disabled={status === "loading"}>
						Créer
					</button>
				</div>
			</form>
		</div>
	);
};

export default GroupForm;
