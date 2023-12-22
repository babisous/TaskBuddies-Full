import React, { useState } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import PageTitle from "../components/PageTitle";
import "../styles/auth.scss";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
	const [showSignup, setShowSignup] = useState(false);

	const toggleShowSignup = () => {
		setShowSignup(!showSignup);
	};

	const pageTitleSuffix = showSignup ? "S'inscrire" : "Se connecter";
	const token = localStorage.getItem("token");

	if (token) return <Navigate to="/dashboard" replace />;

	return (
		<>
			<PageTitle suffix={pageTitleSuffix} />
			<img className="logo" src="img/Logo.svg" alt="Logo de TaskBuddies" />
			<div className="loginPage">
				{showSignup ? (
					<Signup toggleShowSignup={toggleShowSignup} />
				) : (
					<Login toggleShowSignup={toggleShowSignup} />
				)}
			</div>
		</>
	);
};

export default LoginPage;
