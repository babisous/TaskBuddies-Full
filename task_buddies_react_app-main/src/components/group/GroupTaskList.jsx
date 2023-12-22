// Importation des dépendances nécessaires
import React, { useEffect, useState } from "react";
import GroupTaskTile from "./GroupTaskTile"; // Importation du composant GroupTaskTile
import GroupTagList from "../tag/GroupTagList"; // Importation du composant GroupTagList
import GroupTaskForm from "./GroupTaskForm"; // Importation du composant GroupTaskForm

// Importation de la bibliothèque jwt-decode pour décoder les tokens JWT
import jwt_decode from "jwt-decode";

// Importation des icônes FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// Importation des hooks useSelector et useDispatch de Redux
import { useSelector, useDispatch } from "react-redux";
// Importation des actions et des sélecteurs du slice 'task' de Redux
import { fetchGroupTasks, taskSliceActions } from "../../store/dashboard/task";

// Définition du composant GroupTaskList
const GroupTaskList = ({ authorId, groupId }) => {
	// Utilisation du hook useDispatch pour pouvoir dispatcher des actions
	const dispatch = useDispatch();
	// Utilisation du hook useSelector pour accéder à l'état du store Redux
	const { groupTasks, status, error } = useSelector((state) => state.task);
	const selectedDateStr = useSelector((state) => state.task.selectedDate);
	const selectedDate = new Date(selectedDateStr);
	const selectedTags = useSelector((state) => state.task.selectedTags);

	// Récupération du token JWT stocké dans le localStorage
	const token = localStorage.getItem("token"); // Remplacez 'token' par la clé que vous utilisez pour stocker le token
	// Décodage du token JWT pour obtenir les informations de l'utilisateur
	const decodedToken = jwt_decode(token);
	// Récupération de l'ID de l'utilisateur à partir du token décodé
	const currentUserId = decodedToken.id; // Remplacez 'userId' par la clé que vous utilisez pour stocker l'ID de l'utilisateur dans le token

	// Utilisation du hook useEffect pour dispatcher l'action fetchGroupTasks lors du montage du composant
	useEffect(() => {
		dispatch(fetchGroupTasks([groupId]));
	}, [dispatch, selectedTags, groupId, selectedDateStr]);

	// Définition de la fonction handleDateChange qui met à jour la date sélectionnée et dispatch l'action fetchGroupTasks
	const handleDateChange = (newDate) => {
		dispatch(taskSliceActions.setSelectedDate(newDate.toISOString()));
		dispatch(fetchGroupTasks([groupId])); // Utilisez un tableau pour passer l'ID du groupe
	};

	// Définition de la fonction handleTagClickFilter qui met à jour les tags sélectionnés
	const handleTagClickFilter = (tagId) => {
		let newSelectedTags;

		// Si le tag est déjà sélectionné, on le retire de la liste des tags sélectionnés
		if (selectedTags.includes(tagId)) {
			newSelectedTags = selectedTags.filter((id) => id !== tagId);
		} else {
			// Sinon, on l'ajoute à la liste des tags sélectionnés
			newSelectedTags = [...selectedTags, tagId];
		}

		// Dispatch de l'action setSelectedTags avec la nouvelle liste de tags sélectionnés
		dispatch(taskSliceActions.setSelectedTags(newSelectedTags));
	};

	// Définition de l'état local showForm et de sa fonction de mise à jour setShowForm
	const [showForm, setShowForm] = useState(false); // Ajoutez cet état

	// Définition de la fonction handleButtonClick qui met à jour l'état showForm à true
	const handleButtonClick = () => {
		setShowForm(true);
	};

	// Définition de la fonction handleBackClick qui met à jour l'état showForm à false
	const handleBackClick = () => {
		setShowForm(false);
	};
	// Si showForm est true, on affiche le formulaire GroupTaskForm
	if (showForm) {
		return (
			<GroupTaskForm groupId={groupId} handleBackClick={handleBackClick} />
		);
	}

	// Sinon, on affiche la liste des tâches du groupe
	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Tâches de groupe à réaliser 💪</p>
				{currentUserId === authorId && (
					<button className="headerBtn" onClick={handleButtonClick}>
						<FontAwesomeIcon icon={faPlusCircle} />
					</button>
				)}
			</div>
			<GroupTagList groupId={groupId} />
			<div className="bodyContainer">
				{groupTasks[groupId]?.map(
					(
						task // Utilisez la notation de point d'interrogation pour vérifier si les tâches du groupe existent
					) => (
						<GroupTaskTile
							key={task.id}
							task={task}
							selectedDate={selectedDate}
							groupId={groupId}
						/>
					)
				)}
			</div>
		</div>
	);
};

// Exportation du composant GroupTaskList
export default GroupTaskList;
