import jwtDecode from "jwt-decode";

const API_BASE_URL = process.env.API_URL;

export const tagService = {
	async addTag(title, icon, color) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${API_BASE_URL}/tag`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title,
					icon,
					color,
				}),
			});

			if (response.ok) {
				// Tag added successfully
			} else {
				throw new Error("Failed to add tag");
			}
		} catch (error) {
			throw new Error("Failed to add tag");
		}
	},

	async deleteTag(tagId) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${API_BASE_URL}/tag/${tagId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (error) {
			throw new Error("Failed to delete tag");
		}
	},

	async updateTag(tagId, title, icon, color) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${API_BASE_URL}/tag/${tagId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title,
					icon,
					color,
				}),
			});
			return response;
		} catch (error) {
			throw new Error("Failed to update tag");
		}
	},

	async fetchTagsByUser() {
		const token = localStorage.getItem("token");

		const userId = jwtDecode(token).id;

		try {
			const response = await fetch(`${API_BASE_URL}/tag/user/${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const tags = await response.json();
				return tags;
			}
		} catch (error) {
			throw new Error("Failed to load tags");
		}
	},
	async fetchGroupTags(groupId) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${API_BASE_URL}/tag/group/${groupId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const tags = await response.json();
				return tags;
			} else {
				throw new Error("Failed to load group tags");
			}
		} catch (error) {
			throw new Error("Failed to load group tags");
		}
	},
	async addGroupTag(groupId, title, icon, hexColor) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${API_BASE_URL}/tag/group/${groupId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ title, icon, color: hexColor }),
			});

			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				throw new Error("Failed to add group tag");
			}
		} catch (error) {
			throw new Error("Failed to add group tag");
		}
	},
};
