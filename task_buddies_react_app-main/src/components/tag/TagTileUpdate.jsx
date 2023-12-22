// TagTileUpdate.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tagIcons } from "../../utils/tagData";

import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { tagService } from "../../services/tagService";
import { useDispatch } from "react-redux";
import { fetchTagsByUser, fetchGroupTags } from "../../store/dashboard/tag";

const TagTileUpdate = ({ tag, setTagUpdated }) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		setTagUpdated(tag);
	};

	const handleDelete = async () => {
		try {
			await tagService.deleteTag(tag.id);
			dispatch(fetchTagsByUser());
			dispatch(fetchGroupTags([groupId]));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div
			className="tagTileContainer"
			style={{
				color: tag.color,
				border: "1px solid #e0e0e0",
			}}
		>
			<div className="tagIcon">
				<FontAwesomeIcon
					icon={tagIcons[tag.icon]}
					style={{ color: tag.color, height: "12px" }}
				/>
			</div>
			<div className="tagTitle">
				<p>{tag.title}</p>
			</div>
			<div className="groupIcons">
				<FontAwesomeIcon icon={faPen} onClick={handleClick} />
				<FontAwesomeIcon icon={faTrashAlt} onClick={handleDelete} />
			</div>
		</div>
	);
};

export default TagTileUpdate;
