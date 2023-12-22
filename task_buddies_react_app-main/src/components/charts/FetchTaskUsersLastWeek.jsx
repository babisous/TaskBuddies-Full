import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskUsersDateRange } from "../../store/dashboard/taskUser";

const FetchTaskUsersLastWeek = () => {
	const dispatch = useDispatch();
	const taskUsersLastWeek = useSelector(
		(state) => state.taskUser.taskUsersDateRange
	);

	const [abscisseDate, setAbscisseDate] = useState([]);

	useEffect(() => {
		const endDate = new Date();
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - 7); // Définir la date de début à 7 jours avant la date de fin

		dispatch(fetchTaskUsersDateRange({ startDate, endDate }));

		// Créer le tableau abscisseDate
		const days = [];
		for (
			let d = new Date(startDate);
			d <= endDate;
			d.setDate(d.getDate() + 1)
		) {
			const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
			days.push(dayNames[d.getDay()]);
		}
		setAbscisseDate(days);
	}, [dispatch]);

	// Convertir l'objet en tableau
	const taskUsersArray = Object.values(taskUsersLastWeek);

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Liste des TaskUsers des 7 derniers jours</p>
				<p>Jours: {abscisseDate.join(", ")}</p>
			</div>
			<div className="bodyContainer">
				<ul>
					{taskUsersArray.map((taskUser, index) => (
						<li key={index}>
							{/* Affichez les informations que vous voulez ici */}
							{taskUser.title}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default FetchTaskUsersLastWeek;
