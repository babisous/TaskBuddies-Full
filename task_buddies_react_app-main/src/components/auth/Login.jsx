// src/components/auth/Login.js
import React, { useState } from "react";
import { authService } from "../../services/authService";
import { Navigate } from "react-router-dom";

const Login = ({ toggleShowSignup }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setLoggedIn] = useState(false); // Ajout de l'état pour suivre l'état de connexion
	const [loginError, setLoginError] = useState(""); // Ajout de l'état pour suivre les erreurs de connexion

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await authService.login({ email, password });
			localStorage.setItem("token", response.jwtToken);
			setLoggedIn(true); // Met à jour l'état de connexion après une connexion réussie
		} catch (error) {
			console.error("Une erreur s'est produite lors de la connexion :", error);
			setLoginError(error.message);
		}
	};

	// Si l'utilisateur est connecté, redirige vers le tableau de bord
	if (isLoggedIn) {
		return <Navigate to="/dashboard" replace />;
	}

	return (
		<div className="authContainer">
			<h2 className="authTitle">
				Hello 👋, <br /> déjà un compte ?
			</h2>
			<form className="authForm" onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Adresse email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<input
					type="password"
					placeholder="Mot de passe"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				{loginError && <p className="errorMsg">{loginError}</p>}

				<div className="authBtnContainer">
					<button onClick={toggleShowSignup} className="secondaryBtn">
						Pas encore de compte ? S'inscrire
					</button>
					<button type="submit">Se connecter</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
