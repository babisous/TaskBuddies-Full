import React, { useState } from "react";
import { authService } from "../../services/authService";

const Signup = ({ toggleShowSignup }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [isSigned, setIsSigned] = useState(false);
	const [passwordError, setPasswordError] = useState(""); // Ajout de l'état pour suivre les erreurs de mot de passe

	const validatePassword = (password) => {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		return regex.test(password);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validatePassword(password)) {
			try {
				await authService.signup({ email, password, username });
				setIsSigned(true);
			} catch (error) {
				console.error("Error during signup:", error);
			}
		} else {
			setPasswordError(
				"Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre."
			);
		}
	};

	if (isSigned) {
		toggleShowSignup();
	}

	return (
		<div className="authContainer">
			<h2 className="authTitle">
				Hello 👋, <br /> nouveau sur TaskBuddies ?
			</h2>
			<form className="authForm" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Nom d'utilisateur"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Adresse email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Mot de passe"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{passwordError && <p className="errorMsg">{passwordError}</p>}
				<div className="authBtnContainer">
					<button onClick={toggleShowSignup} className="secondaryBtn">
						Déjà un compte ? Connectez-vous
					</button>
					<button type="submit">S'inscrire</button>
				</div>
			</form>
		</div>
	);
};

export default Signup;
