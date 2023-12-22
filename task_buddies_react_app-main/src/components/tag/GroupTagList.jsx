import { useEffect } from "react";
import TagTile from "./TagTile";

import { useSelector, useDispatch } from "react-redux";
import { fetchGroupTags } from "../../store/dashboard/tag";
import { taskSliceActions } from "../../store/dashboard/task";

const GroupTagList = ({ groupId }) => {
	const dispatch = useDispatch();
	const { groupTags, status, error } = useSelector((state) => state.tag);
	// GroupTagList.jsx
	const selectedTags = useSelector((state) => state.task.selectedTags);

	const handleTagClick = (tagId) => {
		let newSelectedTags;

		if (selectedTags.includes(tagId)) {
			newSelectedTags = selectedTags.filter((id) => id !== tagId);
		} else {
			newSelectedTags = [...selectedTags, tagId];
		}

		dispatch(taskSliceActions.setSelectedTags(newSelectedTags));
	};

	useEffect(() => {
		dispatch(fetchGroupTags([groupId]));
	}, [dispatch, groupId]);

	return (
		<div className="tagsContainer">
			{groupTags[groupId]?.map((tag) => (
				<TagTile
					key={tag.id}
					tag={tag}
					onTagClick={() => handleTagClick(tag.id)}
					isActive={selectedTags.includes(tag.id)}
				/>
			))}
		</div>
	);
};

export default GroupTagList;
