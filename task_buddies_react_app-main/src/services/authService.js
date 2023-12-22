// src/services/authService.js

const API_URL = process.env.API_URL;

export const authService = {
	async signup(userData) {
		try {
			const response = await fetch(`${API_URL}/auth/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userData),
			});

			return response.json();
		} catch (error) {
			console.error("Error during signup:", error);
			throw error;
		}
	},

	// src/services/authService.js

	async login({ email, password }) {
		const response = await fetch(`${API_URL}/auth/signin`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		if (!response.ok) {
			throw new Error(
				"Il semblerait que votre email ou votre mot de passe soit incorrect."
			);
		}
		return response.json();
	},

	logout() {
		localStorage.removeItem("token");
		// Redirigez l'utilisateur vers la page de connexion
		window.location.href = "/login";
	},
};
