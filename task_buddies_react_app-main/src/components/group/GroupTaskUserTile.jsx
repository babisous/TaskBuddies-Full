import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CommentForm from "./CommentForm";
import { fetchCommentsByTaskUser } from "../../store/dashboard/comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

const GroupTaskUserTile = ({ taskUser }) => {
	const dispatch = useDispatch();
	const doneAt = new Date(taskUser.doneAt);
	const [showCommentForm, setShowCommentForm] = useState(false);

	useEffect(() => {
		dispatch(fetchCommentsByTaskUser(taskUser.id));
	}, [dispatch, taskUser.id]);

	const handleCommentButtonClick = () => {
		setShowCommentForm(!showCommentForm);
	};

	return (
		<div>
			<div className="tileContainer">
				<p>
					{taskUser.user.username} a réalisé{" "}
					<small style={{ color: taskUser.tags.color }}>
						{taskUser.title}{" "}
					</small>
					à{" "}
					{doneAt.toLocaleTimeString("fr-FR", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
				<button className="headerBtn" onClick={handleCommentButtonClick}>
					<FontAwesomeIcon icon={faShare} />
				</button>
			</div>
			{showCommentForm && <CommentForm taskUserId={taskUser.id} />}
		</div>
	);
};

export default GroupTaskUserTile;
