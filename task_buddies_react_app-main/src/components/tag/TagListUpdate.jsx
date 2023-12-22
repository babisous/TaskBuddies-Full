// TagListUpdate.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TagTileUpdate from "./TagTileUpdate"; // Assurez-vous de créer ce composant
import { fetchTagsByUser } from "../../store/dashboard/tag"; // Importez l'action fetchTagsByUser

const TagListUpdate = ({ setTagUpdated }) => {
	const dispatch = useDispatch(); // Utilisez useDispatch pour créer une fonction dispatch

	// Utilisez useSelector pour accéder aux tags dans le state de Redux
	const tags = useSelector((state) => state.tag.tags);

	useEffect(() => {
		dispatch(fetchTagsByUser()); // Dispatchez l'action fetchTagsByUser lorsque le composant est monté
	}, [dispatch]);

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Liste des tags :</p>
			</div>
			<div className="tagListUpdateContainer">
				{tags.map((tag) => (
					<TagTileUpdate key={tag.id} tag={tag} setTagUpdated={setTagUpdated} />
				))}
			</div>
		</div>
	);
};

export default TagListUpdate;
