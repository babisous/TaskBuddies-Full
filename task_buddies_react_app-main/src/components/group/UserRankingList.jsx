import React, { useEffect, useState } from "react";
import { tagColors } from "../../utils/tagData";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { fetchCountTaskUsersByGroupAndUserOnDateRange } from "../../store/dashboard/taskUser";

// Le composant UserRankingList prend en entrée une liste d'utilisateurs et un identifiant de groupe
const UserRankingList = ({ users, groupId }) => {
	// Le cadre temporel est initialisé à "semaine"
	const [timeframe, setTimeframe] = useState("week");
	const dispatch = useDispatch();
	// countTaskUsersByUser est un objet qui stocke le nombre de tâches par utilisateur
	const countTaskUsersByUser = useSelector(
		(state) => state.taskUser.countTaskUsersByUser
	);

	// Les dates de début et de fin sont initialisées à la date actuelle
	const endDate = new Date();
	const startDate = new Date();
	startDate.setDate(endDate.getDate() - 7);

	// À chaque fois que le cadre temporel, les utilisateurs, l'identifiant du groupe, la date de début ou la date de fin changent,
	// une action est dispatchée pour chaque utilisateur afin de récupérer le nombre de tâches pour cet utilisateur dans le groupe et la plage de dates spécifiés
	useEffect(() => {
		users.forEach((user) => {
			dispatch(
				fetchCountTaskUsersByGroupAndUserOnDateRange({
					groupId,
					userId: user.id,
					startDate,
					endDate,
				})
			);
		});
	}, [dispatch, users, groupId, startDate, endDate, timeframe]);

	// Les utilisateurs sont triés en fonction du nombre de tâches (stocké dans countTaskUsersByUser)
	const sortedUsers = [...users].sort((a, b) => {
		const countA = countTaskUsersByUser[a.id] || 0;
		const countB = countTaskUsersByUser[b.id] || 0;
		return countB - countA;
	});

	// Le composant retourne une liste d'utilisateurs triés avec le nombre de tâches pour chaque utilisateur
	return (
		<div
			className="componentContainer"
			style={{ width: "100%", height: "100%" }}
		>
			<div className="componentHeader">
				<p>Classement des utilisateurs :</p>
			</div>

			<div className="bodyContainer">
				{sortedUsers.map((user, index) => {
					let colorStyle = {};
					if (index === 0) {
						colorStyle = { color: "#f5c042", borderColor: "#f5c042" };
					} else if (index === 1) {
						colorStyle = { color: "#bcceff", borderColor: "#bcceff" };
					} else if (index === 2) {
						colorStyle = { color: "#f5a742", borderColor: "#f5a742" };
					}

					return (
						<div key={user.id} className="tileContainer" style={colorStyle}>
							<p>
								{index + 1}. {user.username} :{" "}
								{countTaskUsersByUser[user.id] || 0} tâches
							</p>
							{index === 0 && <FontAwesomeIcon icon={faMedal} />}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default UserRankingList;
