import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { groupService } from "../../services/groupService";
import { fetchCommentsByTaskUser } from "../../store/dashboard/comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const CommentForm = ({ taskUserId }) => {
	const dispatch = useDispatch();
	const [content, setContent] = useState("");
	const [isInputOpen, setIsInputOpen] = useState(true);
	const [error, setError] = useState("");

	const handleContentChange = (event) => {
		setContent(event.target.value);
		if (event.target.value === "") {
			setError("Votre commentaire est vide");
		} else {
			setError("");
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (content === "") {
			setError("Votre commentaire est vide");
			return;
		}
		try {
			await groupService.createComment(taskUserId, content);
			dispatch(fetchCommentsByTaskUser(taskUserId));
			setContent("");
			setIsInputOpen(false);
		} catch (error) {
			console.error("Erreur lors de la création du commentaire :", error);
		}
	};

	if (!isInputOpen) {
		return null;
	}

	return (
		<div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
			<form onSubmit={handleSubmit} className="formComment">
				<input
					type="text"
					value={content}
					onChange={handleContentChange}
					className="inputComment"
				/>

				<button type="submit" className="btnComment">
					<FontAwesomeIcon icon={faPaperPlane} />
				</button>
			</form>
			{error && (
				<div style={{ color: "#eb546f", fontSize: "12px" }}>{error}</div>
			)}
		</div>
	);
};

export default CommentForm;
