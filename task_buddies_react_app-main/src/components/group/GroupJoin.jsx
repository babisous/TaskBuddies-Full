import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupService } from "../../services/groupService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPeopleGroup,
	faPersonCirclePlus,
	faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const GroupJoin = ({ handleCreateClick, handleJoinClick, handleListClick }) => {
	const dispatch = useDispatch();
	const [entryCode, setEntryCode] = useState("");

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			await dispatch(groupService.joinGroup(entryCode));
		} catch (error) {
			console.error(
				"Erreur lors de la tentative de rejoindre le groupe :",
				error
			);
		}
	};

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Rejoindre un groupe 💡</p>
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
					<label htmlFor="entryCode">Code d'entrée</label>
					<input
						type="text"
						id="entryCode"
						value={entryCode}
						onChange={(event) => setEntryCode(event.target.value)}
						placeholder="Code d'entrée"
						required
					/>
				</div>
				<div className="inputContainer">
					<button type="submit">Rejoindre</button>
				</div>
			</form>
		</div>
	);
};

export default GroupJoin;
