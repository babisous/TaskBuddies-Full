const API_BASE_URL = process.env.API_URL;

export const userService = {
	token: localStorage.getItem("token"),

	async updateUser(username, email, password, currentPassword) {
		try {
			console.log(API_BASE_URL);
			const response = await fetch(`${API_BASE_URL}/users`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.token}`,
				},
				body: JSON.stringify({
					username,
					email,
					password,
					currentPassword,
				}),
			});

			if (response.ok) {
				// L'utilisateur a été mis à jour avec succès
			} else {
				throw new Error("Échec de la mise à jour de l'utilisateur");
			}
		} catch (error) {
			throw new Error("Échec de la mise à jour de l'utilisateur");
		}
	},
};
