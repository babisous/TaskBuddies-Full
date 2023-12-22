import { useState, useEffect } from "react";
import TagTile from "./TagTile";

import { useSelector, useDispatch } from "react-redux";
import { fetchGroupTags } from "../../store/dashboard/tag"; // Import fetchGroupTags action
import { fetchGroupTasks, taskSliceActions } from "../../store/dashboard/task"; // Import fetchGroupTasks action

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const GroupTagListForForm = ({
	groupId,
	idSelected,
	setIdSelected,
	onAddTag,
}) => {
	const dispatch = useDispatch();
	const { groupTags, status, error } = useSelector((state) => state.tag);
	const selectedTags = useSelector((state) => state.task.selectedTags);

	const isActiveTag = (tag) => selectedTags.includes(tag.id);

	return (
		<div className="tagsContainer">
			<button className="headerBtn" onClick={onAddTag}>
				<FontAwesomeIcon icon={faPlusCircle} style={{ width: 20 }} />
			</button>
			{groupTags[groupId]?.map((tag) => (
				<TagTile
					key={tag.id}
					tag={tag}
					onTagClick={() => setIdSelected(tag.id)}
					isActive={idSelected === tag.id}
				/>
			))}
		</div>
	);
};

export default GroupTagListForForm;
