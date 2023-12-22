const API_BASE_URL = process.env.API_URL;

export const taskService = {
	async fetchTasks() {
		// Retrieve the token within the method so it gets the latest value each time
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${API_BASE_URL}/task`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const tasks = await response.json();
				return tasks.map((task) => ({
					id: task.id,
					title: task.title,
					tags: task.tags,
					recurrences: task.recurrences,
				}));
			} else {
				throw new Error("Failed to load tasks");
			}
		} catch (error) {
			throw new Error("Failed to load tasks");
		}
	},

	async removeTask(id) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${API_BASE_URL}/task/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (error) {
			console.error("Error:", error);
			throw new Error("Failed to delete task");
		}
	},

	async updateTask(id, title, recurrences, idSelected) {
		const token = localStorage.getItem("token");
		const selectedTags = [idSelected];

		try {
			const response = await fetch(`${API_BASE_URL}/task/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title,
					recurrences,
					tags: selectedTags.map((tagId) => ({ id: tagId })),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to update task");
			}

			const data = await response.json();
			console.log("data", data);
			return data;
		} catch (error) {
			console.error("Error:", error);
			throw new Error("Failed to update task");
		}
	},

	async fetchTasksByDate(selectedDate, tagsStr) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(
				`${API_BASE_URL}/task/date?date=${selectedDate.toISOString()}&tags=${tagsStr}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				const tasks = await response.json();
				return tasks.map((task) => ({
					id: task.id,
					title: task.title,
					tags: task.tags,
				}));
			} else {
				throw new Error("Failed to load tasks");
			}
		} catch (error) {
			throw new Error("Failed to load tasks");
		}
	},

	async addTask(title, recurrences, idSelected) {
		const token = localStorage.getItem("token");
		const selectedTags = [idSelected];

		try {
			const response = await fetch(`${API_BASE_URL}/task`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title,
					recurrences,
					tags: selectedTags.map((tagId) => ({ id: tagId })),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to add task");
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error:", error);
			throw new Error("Failed to add task");
		}
	},

	async addTaskUser(taskId) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${API_BASE_URL}/task-user`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					task: {
						id: taskId,
					},
				}),
			});

			if (response.ok) {
				// Task user added successfully
			} else {
				throw new Error("Failed to add task user");
			}
		} catch (error) {
			throw new Error("Failed to add task user");
		}
	},

	async removeTaskUser(taskId) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${API_BASE_URL}/task-user/${taskId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				// Task user removed successfully
			} else {
				throw new Error("Failed to remove task user");
			}
		} catch (error) {
			throw new Error("Failed to remove task user");
		}
	},
	async hasTaskBeenValidatedOnDate(taskId, onDate) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(
				`${API_BASE_URL}/task-user/${taskId}/validated-today/${onDate}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				return result.validated;
			} else {
				throw new Error("Failed to check task validation");
			}
		} catch (error) {
			throw new Error("Failed to check task validation");
		}
	},

	async fetchGroupTasks(groupId, selectedDate, tagsStr) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(
				`${API_BASE_URL}/task/group/${groupId}/date/${selectedDate.toISOString()}?tags=${tagsStr}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				const tasks = await response.json();
				return tasks.map((task) => ({
					id: task.id,
					title: task.title,
					tags: task.tags,
				}));
			} else {
				throw new Error("Failed to load group tasks");
			}
		} catch (error) {
			throw new Error("Failed to load group tasks");
		}
	},

	async fetchTaskUsersByGroupAndDate(groupId, onDate) {
		const token = localStorage.getItem("token");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		try {
			const response = await fetch(
				`${API_BASE_URL}/task-user/group/${groupId}/date/${onDate}`,
				{
					method: "GET",
					headers: config.headers,
				}
			);

			if (response.ok) {
				const taskUsers = await response.json();
				return taskUsers.map((taskUser) => ({
					id: taskUser.id,
					title: taskUser.task.title,
					tags: taskUser.task.tags[0],
					doneAt: taskUser.doneAt,
					user: taskUser.user,
				}));
			} else {
				throw new Error("Erreur lors de la récupération des TaskUsers");
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des TaskUsers :", error);
			throw error;
		}
	},

	async fetchTaskUsersByDate(onDate) {
		const token = localStorage.getItem("token");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		try {
			const response = await fetch(
				`${API_BASE_URL}/task-user/user/date/${onDate}`,
				{
					method: "GET",
					headers: config.headers,
				}
			);

			if (response.ok) {
				const taskUsers = await response.json();
				console.log("taskUsers", taskUsers);
				return taskUsers.map((taskUser) => ({
					id: taskUser.id,
					title: taskUser.task.title,
					taskId: taskUser.task.id,
					tags: taskUser.task.tags[0],
					doneAt: taskUser.doneAt,
				}));
			} else {
				throw new Error(
					"Erreur lors de la récupération des utilisateurs de tâches"
				);
			}
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des utilisateurs de tâches :",
				error
			);
			throw error;
		}
	},

	async createTaskWithGroup(title, recurrences, groupId, idSelected) {
		const token = localStorage.getItem("token");
		const selectedTags = [idSelected];
		try {
			const response = await fetch(`${API_BASE_URL}/task/group/${groupId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title,
					recurrences,
					tags: selectedTags.map((tagId) => ({ id: tagId })),
				}),
			});

			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				throw new Error("Erreur lors de la récupération des TaskUsers");
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des TaskUsers :", error);
			throw error;
		}
	},
	async createTaskWithGroup(title, recurrences, groupId, idSelected) {
		const token = localStorage.getItem("token");
		const selectedTags = [idSelected];
		try {
			const response = await fetch(`${API_BASE_URL}/task/group/${groupId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title,
					recurrences,
					tags: selectedTags.map((tagId) => ({ id: tagId })),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create task");
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error:", error);
			throw new Error("Failed to create task");
		}
	},

	async fetchTaskUsersDateRange(startDate, endDate) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(
				`${API_BASE_URL}/task-user/user/date-range/${startDate}/${endDate}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				const taskUsers = await response.json();
				return taskUsers.map((taskUser) => ({
					id: taskUser.id,
					title: taskUser.task.title,
					tags: taskUser.task.tags[0],
					doneAt: taskUser.doneAt,
					group: taskUser.task.group,
				}));
			} else {
				throw new Error("Failed to load tasks");
			}
		} catch (error) {
			throw new Error("Failed to load tasks");
		}
	},

	async fetchTaskUsersInGroupByDateRange(startDate, endDate) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(
				`${API_BASE_URL}/task-user/user/group/date-range/${startDate}/${endDate}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				const taskUsers = await response.json();
				return taskUsers.map((taskUser) => ({
					id: taskUser.id,
					title: taskUser.task.title,
					tags: taskUser.task.tags[0],
					doneAt: taskUser.doneAt,
				}));
			} else {
				throw new Error("Échec du chargement des tâches");
			}
		} catch (error) {
			throw new Error("Échec du chargement des tâches");
		}
	},
	async fetchCountTaskUsersByGroupAndUserOnDateRange(
		groupId,
		userId,
		startDate,
		endDate
	) {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(
				`${API_BASE_URL}/task-user/count/${groupId}/${userId}/date-range/${startDate}/${endDate}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				const count = await response.json();
				return count;
			} else {
				throw new Error("Failed to fetch count of TaskUsers");
			}
		} catch (error) {
			throw new Error("Failed to fetch count of TaskUsers");
		}
	},

	// Dans votre fichier taskService.js
	findAllTasksByGroup(groupId) {
		const token = localStorage.getItem("token");

		return fetch(`${API_BASE_URL}/task/group/${groupId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Failed to load tasks");
				}
			})
			.then((tasks) => {
				return tasks.map((task) => ({
					id: task.id,
					title: task.title,
					tags: task.tags,
					recurrences: task.recurrences,
				}));
			})
			.catch((error) => {
				throw new Error("Failed to load tasks");
			});
	},
};
