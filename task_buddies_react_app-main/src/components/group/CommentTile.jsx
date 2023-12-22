// CommentTile.jsx
import React from "react";

const CommentTile = ({ comment, taskTitle, tagColor, taskDoneAt }) => {
	return (
		<div key={comment.id} className="commentTileContainer">
			<div className="userCommentText">
				<p style={{ color: tagColor }}>{comment.author.username}</p>
				<small style={{ color: tagColor }}>
					{taskTitle} -{" "}
					{new Date(taskDoneAt).toLocaleString("fr-FR", {
						hour: "2-digit",
						minute: "2-digit",
						day: "2-digit",
						month: "2-digit",
					})}
				</small>
			</div>
			<p> {comment.content}</p>
		</div>
	);
};

export default CommentTile;
