import { useEffect } from "react";
import TagTile from "./TagTile";

import { useSelector, useDispatch } from "react-redux";
import { fetchTagsByUser } from "../../store/dashboard/tag";
import { fetchTasks, taskSliceActions } from "../../store/dashboard/task"; // Import fetchTasks action
import { fetchGroupTags } from "../../store/dashboard/tag";

import { fetchUserGroups } from "../../store/dashboard/group";

const TagList = ({ handleAction }) => {
	const dispatch = useDispatch();
	const { tags, groupTags, status, error } = useSelector((state) => state.tag);
	const selectedTags = useSelector((state) => state.task.selectedTags); // Get selectedTags from the state
	const { userGroups } = useSelector((state) => state.group);

	useEffect(() => {
		const groupIds = userGroups.map((group) => group.id);
		dispatch(fetchGroupTags(groupIds));
	}, [dispatch, userGroups]);

	useEffect(() => {
		dispatch(fetchUserGroups());
	}, [dispatch]);

	// Utilisez useEffect pour déclencher le fetch des tâches lorsque le composant est monté.
	useEffect(() => {
		dispatch(fetchTagsByUser());
	}, [dispatch]);

	// Utilisez useEffect pour déclencher le fetch des tâches chaque fois que selectedTags change.
	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch, selectedTags]);

	useEffect(() => {
		dispatch(fetchUserGroups());
	}, [dispatch]);

	// ...
	const personalTags = tags;
	const groupTagsArray = Object.values(groupTags).flat();

	const allTags = [...personalTags, ...groupTagsArray];

	return (
		<div className="tagsContainer">
			{allTags.map((tag) => (
				<TagTile
					key={tag.id}
					tag={tag}
					onTagClick={handleAction}
					isActive={selectedTags.includes(tag.id)}
				/>
			))}
		</div>
	);
};

export default TagList;
