import React, { useState, useEffect } from "react";
import { userService } from "../../services/userService";
import jwt_decode from "jwt-decode";

const UserUpdateForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [errorText, setErrorText] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = jwt_decode(token);
			setUsername(decodedToken.username);
			setEmail(decodedToken.email);
		}
	}, []);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			setErrorText("");

			if (!currentPassword) {
				setErrorText("Le mot de passe actuel est obligatoire.");
				return;
			}

			const userUpdates = {};
			if (username) userUpdates.username = username;
			if (email) userUpdates.email = email;
			if (password) {
				// Vérifiez si le nouveau mot de passe respecte les critères
				const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
				if (!passwordRegex.test(password)) {
					setErrorText(
						"Le nouveau mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule et un chiffre."
					);
					return;
				}
				userUpdates.password = password;
			}

			console.log("userUpdates:", userUpdates); // Affiche les mises à jour de l'utilisateur

			await userService.updateUser(username, email, password, currentPassword);
			alert("Vos informations ont bien été mises à jour");
		} catch (error) {
			console.error("Update error:", error); // Affiche l'erreur
			if (error.response && error.response.status === 400) {
				setErrorText("Le mot de passe actuel est incorrect.");
			} else {
				setErrorText("Échec de la mise à jour");
			}
		}
	};

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Mettre à jour le profil</p>
			</div>
			<div className="bodyContainer">
				<form onSubmit={handleFormSubmit}>
					<div className="inputContainer">
						<label htmlFor="username">Nom d'utilisateur</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
						/>
					</div>
					<div className="inputContainer">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" value={email} disabled />
					</div>
					<div className="inputContainer">
						<label htmlFor="password">Nouveau mot de passe</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
						/>
					</div>
					<div className="inputContainer">
						<label htmlFor="currentPassword">Mot de passe actuel</label>
						<input
							type="password"
							id="currentPassword"
							value={currentPassword}
							onChange={(event) => setCurrentPassword(event.target.value)}
							required
						/>
					</div>
					<div className="inputContainer">
						{errorText && <div className="errorText">{errorText}</div>}
						<button type="submit">Mettre à jour</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UserUpdateForm;
