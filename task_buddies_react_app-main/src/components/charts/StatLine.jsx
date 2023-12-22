// Importation des dépendances nécessaires
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskUsersDateRange } from "../../store/dashboard/taskUser";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
} from "chart.js";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement
);

const StatLine = ({ setStartDate, setEndDate }) => {
	const [timeframe, setTimeframe] = useState("week"); // 'week' ou 'month'
	const dispatch = useDispatch();
	const taskUsersData = useSelector(
		(state) => state.taskUser.taskUsersDateRange
	);
	const taskUsers = Array.isArray(taskUsersData) ? taskUsersData : [];

	useEffect(() => {
		const endDate = new Date();
		let startDate = new Date();

		if (timeframe === "week") {
			startDate.setDate(endDate.getDate() - 6);
		} else if (timeframe === "month") {
			startDate.setDate(endDate.getDate() - 29);
		}

		// Mettre à jour startDate et endDate dans le composant parent
		setStartDate(startDate);
		setEndDate(endDate);

		dispatch(fetchTaskUsersDateRange({ startDate, endDate }));
	}, [dispatch, timeframe, setStartDate, setEndDate]);

	// Créer le tableau abscisseDate
	const abscisseDate = [];
	for (let i = 0; i < (timeframe === "week" ? 7 : 30); i++) {
		const d = new Date();
		d.setDate(d.getDate() - i);
		abscisseDate.unshift(`${d.getDate()}/${d.getMonth() + 1}`);
	}

	// Initialiser les tableaux pour chaque tag avec des zéros et récupérer les couleurs des tags
	const tags = {};
	const tagColors = {};
	taskUsers.forEach((taskUser) => {
		const {
			tags: { title, color },
			doneAt,
		} = taskUser;
		if (!tags[title]) {
			tags[title] = Array(abscisseDate.length).fill(0);
			tagColors[title] = color; // Stocker la couleur du tag
		}

		// Trouver l'index correspondant dans abscisseDate
		const doneAtDate = new Date(doneAt);
		const doneAtIndex = abscisseDate.indexOf(
			`${doneAtDate.getDate()}/${doneAtDate.getMonth() + 1}`
		);

		if (doneAtIndex !== -1) {
			tags[title][doneAtIndex] += 1;
		}
	});

	// Créer les données pour le graphique
	const chartData = {
		labels: abscisseDate,
		datasets: Object.entries(tags).map(([tag, data]) => ({
			label: tag,
			data: data,
			fill: false,
			resoponsive: true,
			borderColor:
				tagColors[tag] ||
				"#" + Math.floor(Math.random() * 16777215).toString(16), // Utiliser la couleur du tag ou une couleur aléatoire si la couleur du tag n'est pas définie
			tension: 0.0,
			pointRadius: 3,
		})),
	};

	return (
		<div className="componentContainer" id="statLineComponent">
			<div className="componentHeader">
				<p>Statistiques des tâches 📈</p>
				<select
					onChange={(e) => setTimeframe(e.target.value)}
					value={timeframe}
				>
					<option value="week">7 derniers jours</option>
					<option value="month">30 derniers jours</option>
				</select>
			</div>
			<div className="bodyContainer">
				<Line
					data={chartData}
					options={{ responsive: true, maintainAspectRatio: false }}
				/>
			</div>
		</div>
	);
};

export default StatLine;
