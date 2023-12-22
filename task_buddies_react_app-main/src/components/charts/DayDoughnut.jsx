// DayDoughnut.jsx
import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskUsers } from "../../store/dashboard/taskUser";

ChartJS.register(ArcElement, Tooltip, Legend);

const DayDoughnut = () => {
	const dispatch = useDispatch();
	const selectedDateStr = useSelector((state) => state.task.selectedDate);
	const selectedDate = new Date(selectedDateStr);

	useEffect(() => {
		dispatch(fetchTaskUsers(selectedDateStr));
	}, [dispatch, selectedDateStr]);

	const { taskUsers } = useSelector((state) => state.taskUser);

	// Vérification si taskUsers est un tableau, sinon on crée un tableau vide
	const { tasks } = useSelector((state) => state.task);
	// Récupération des tâches de groupe à partir du store Redux
	const { groupTasks } = useSelector((state) => state.task);

	// Fusion des tâches et des tâches de groupe dans un seul tableau
	const allTasks = [...tasks, ...Object.values(groupTasks).flat()];

	// Filtrage de taskUsersArray pour n'inclure que les tâches qui existent dans allTasks
	const taskUsersArray = Array.isArray(taskUsers)
		? taskUsers.filter((taskUser) =>
				allTasks.find((task) => task.id === taskUser.taskId)
		  )
		: [];

	// Création d'un objet contenant le nombre de tâches par utilisateur
	const taskUserCounts = taskUsersArray.reduce((acc, taskUser) => {
		// Récupération du tag de la tâche
		const tag = taskUser.tags ? taskUser.tags.title : null;

		// Si le tag existe, on incrémente le compteur pour ce tag
		if (tag) {
			acc[tag] = (acc[tag] || 0) + 1;
		}
		return acc;
	}, {});

	// Création d'un tableau contenant les labels pour le graphique
	const labels = Object.keys(taskUserCounts);
	// Création d'un tableau contenant le nombre de tâches complétées pour chaque label
	const completedTasksData = labels.map((label) => taskUserCounts[label] || 0);
	// Calcul du nombre total de tâches complétées
	const completedTasksCount = completedTasksData.reduce((a, b) => a + b, 0);
	// Récupération du nombre total de tâches à partir du store Redux
	const { totalTasks } = useSelector((state) => state.task);

	// Calcul du nombre de tâches restantes
	const remainingTasksCount = totalTasks - completedTasksCount;

	// Création du tableau de données pour le graphique
	const data = [...completedTasksData, remainingTasksCount];
	// Définition des couleurs de fond pour le graphique
	const backgroundColor = [
		...labels.map((label) => {
			// Recherche du taskUser correspondant au label
			const taskUser = taskUsersArray.find(
				(taskUser) => taskUser.tags && taskUser.tags.title === label
			);
			// Si le taskUser existe et qu'il a été complété, on utilise la couleur du tag, sinon on utilise une couleur grise
			return taskUser && taskUserCounts[label]
				? taskUser.tags.color + "30"
				: "#F1F1F440";
		}),
		"#F1F1F440",
	];

	// Définition des couleurs de bordure pour le graphique
	const borderColor = [
		...labels.map((label) => {
			// Recherche du taskUser correspondant au label
			const taskUser = taskUsersArray.find(
				(taskUser) => taskUser.tags && taskUser.tags.title === label
			);
			// Si le taskUser existe et qu'il a été complété, on utilise la couleur du tag, sinon on utilise une couleur grise
			return taskUser && taskUserCounts[label]
				? taskUser.tags.color
				: "#F1F1F4";
		}),
		"#F1F1F4",
	];
	// Ajout du label "À réaliser" aux labels existants
	const labelsWithRemaining = [...labels, "À réaliser"];

	// Création des données pour le graphique
	const chartData = {
		labels: labelsWithRemaining,
		datasets: [
			{
				label: " Tâches",
				data,
				backgroundColor,
				borderColor,
				borderWidth: 2,
			},
		],
	};

	// Rendu du composant Doughnut avec les options et les données définies
	return (
		<div className="componentContainer" id="dayDoughtNutComponent">
			<div className="componentHeader">
				<p>Diagramme de tâches du jour 🍩</p>
			</div>
			<div className="bodyContainer">
				<Doughnut
					data={chartData}
					options={{ responsive: true, maintainAspectRatio: false }}
				/>
			</div>
		</div>
	);
};

// Exportation du composant DayDoughnut
export default DayDoughnut;
