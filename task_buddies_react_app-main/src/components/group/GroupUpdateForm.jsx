import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { groupService } from "../../services/groupService";

const GroupUpdateForm = () => {
	const { id } = useParams();
	const [groupName, setGroupName] = useState("");
	const [errorText, setErrorText] = useState("");

	useEffect(() => {
		groupService.fetchGroupById(id).then((group) => setGroupName(group.name));
	}, [id]);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			setErrorText("");

			if (!groupName) {
				setErrorText("Le nom du groupe est obligatoire.");
				return;
			}

			await groupService.updateGroup(id, groupName);
			alert("Les informations du groupe ont bien été mises à jour");
		} catch (error) {
			console.error("Update error:", error);
			setErrorText("Échec de la mise à jour");
		}
	};

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Mettre à jour le groupe</p>
			</div>
			<div className="bodyContainer">
				<form onSubmit={handleFormSubmit}>
					<div className="inputContainer">
						<label htmlFor="groupName">Nom du groupe</label>
						<input
							type="text"
							id="groupName"
							value={groupName}
							onChange={(event) => setGroupName(event.target.value)}
							required
						/>
					</div>
					<div className="inputContainer">
						{errorText && <div className="errorText">{errorText}</div>}
						<button type="submit">Mettre à jour</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default GroupUpdateForm;
