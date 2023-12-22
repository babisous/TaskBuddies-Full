import { useState } from "react";
import { useDispatch } from "react-redux"; // Ajoutez cette ligne
import { tagService } from "../../services/tagService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { tagColors, tagIcons } from "../../utils/tagData";
import { fetchGroupTags } from "../../store/dashboard/tag";

const GroupTagForm = ({ groupId, setShowTagForm }) => {
	const dispatch = useDispatch(); // Ajoutez cette ligne
	const [title, setTitle] = useState("");
	const [icon, setIcon] = useState("");
	const [hexColor, setHexColor] = useState("#F1F1F4");
	const [errorText, setErrorText] = useState("");

	const initForm = () => {
		setTitle("");
		setIcon("");
		setHexColor("#F1F1F4");
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		setErrorText("");

		if (icon == "") {
			setErrorText("Veuillez choisir une icone.");
			return;
		}

		if (!title) {
			setErrorText("Le champ nom du tag est obligatoire.");
			return;
		}

		if (!hexColor) {
			setErrorText("Veuillez choisir une couleur.");
			return;
		}

		try {
			await tagService.addGroupTag(groupId, title, icon, hexColor);
			initForm();
			dispatch(fetchGroupTags([groupId]));
			setShowTagForm(false);
		} catch (error) {
			console.error("Failed to add group tag:", error);
		}
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<div className="inputContainer">
				<label htmlFor="title">Nom du tag</label>
				<input
					type="text"
					id="title"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
					placeholder="Titre du tag"
				/>
			</div>
			<div className="inputContainer">
				<label htmlFor="icon">Icone du tag</label>
				<div className="iconContainer">
					{Object.keys(tagIcons).map((key) => (
						<button
							type="button"
							className={`tagIcon ${icon === key ? "active" : ""}`}
							key={key}
							onClick={() => setIcon(key)}
						>
							<FontAwesomeIcon
								icon={tagIcons[key]}
								style={{ color: hexColor }}
							/>
						</button>
					))}
				</div>
			</div>
			<div className="inputContainer">
				<label htmlFor="color">Couleur du tag</label>
				<div className="colorContainer">
					{tagColors.map((color) => (
						<button
							type="button"
							className={`tagColor ${hexColor === color.color ? "active" : ""}`}
							key={color.name}
							onClick={() => setHexColor(color.color)}
							style={{ backgroundColor: color.color }}
						></button>
					))}
				</div>
			</div>
			<div className="inputContainer">
				{errorText && <div className="errorText">{errorText}</div>}
				<button type="submit">Ajouter</button>
			</div>
		</form>
	);
};

export default GroupTagForm;
