import { useState, useEffect } from "react";
import TagTile from "./TagTile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { fetchTagsByUser } from "../../store/dashboard/tag";
import { fetchTasks, taskSliceActions } from "../../store/dashboard/task"; // Import fetchTasks action

const TagListForForm = ({ idSelected, setIdSelected, onAddTag }) => {
	// Utilisez 'null' au lieu de 'nulls'
	const dispatch = useDispatch();
	const { tags, status, error } = useSelector((state) => state.tag);
	const selectedTags = useSelector((state) => state.task.selectedTags); // Get selectedTags from the state
	// Utilisez useEffect pour déclencher le fetch des tâches lorsque le composant est monté.
	useEffect(() => {
		dispatch(fetchTagsByUser());
	}, [dispatch]);

	// Utilisez useEffect pour déclencher le fetch des tâches chaque fois que selectedTags change.
	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch, selectedTags]);

	// Fonction pour vérifier si un tag est actif
	const isActiveTag = (tag) => selectedTags.includes(tag.id);

	return (
		<div className="tagsContainer">
			<button className="headerBtn" onClick={onAddTag}>
				<FontAwesomeIcon icon={faPlusCircle} style={{ width: 20 }} />
			</button>
			{tags.map((tag) => (
				<TagTile
					key={tag.id}
					tag={tag}
					onTagClick={() => {
						setIdSelected(tag.id);
					}} // Remplacez ceci par la méthode de clic que vous voulez utiliser
					isActive={idSelected === tag.id} // Remplacez ceci par la méthode de clic que vous voulez utiliser
				/>
			))}
		</div>
	);
};

export default TagListForForm;
