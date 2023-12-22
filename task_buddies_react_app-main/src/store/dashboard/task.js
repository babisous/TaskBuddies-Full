import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskService } from "../../services/taskService"; // Importation du service de tâches pour interagir avec l'API.

// L'action asynchrone qui fait le fetch.
// Cette action est utilisée pour récupérer les tâches à partir de l'API.
export const fetchTasks = createAsyncThunk(
	"task/fetchTasks",
	async (_, { getState, rejectWithValue }) => {
		const { selectedDate, selectedTags, selectedGroupTags } = getState().task;
		const tagsStr = [...selectedTags, ...selectedGroupTags].join(",");
		try {
			// Tentative de récupération des tâches à partir de l'API.
			const fetchedTasks = await taskService.fetchTasksByDate(
				new Date(selectedDate),
				tagsStr
			);
			// Validation des tâches récupérées.
			const tasksWithValidation = await Promise.all(
				fetchedTasks.map(async (task) => {
					// Vérification si la tâche a été validée à la date sélectionnée.
					const validated = await taskService.hasTaskBeenValidatedOnDate(
						task.id,
						selectedDate
					);
					// Retour de la tâche avec l'information de validation.
					return { ...task, validated };
				})
			);
			// Retour des tâches avec validation.
			return tasksWithValidation;
		} catch (err) {
			// En cas d'erreur, rejet de la valeur avec le message d'erreur.
			return rejectWithValue(err.message);
		}
	}
);

export const fetchAllPersonnalTasks = createAsyncThunk(
	"task/fetchAllPersonnalTasks",
	async (_, { getState, rejectWithValue }) => {
		try {
			const fetchedTasks = await taskService.fetchTasks();
			return fetchedTasks.map((task) => ({
				id: task.id,
				title: task.title,
				tags: task.tags,
				recurrences: task.recurrences, // Assurez-vous que les recurrences sont incluses ici
			}));
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

// L'action asynchrone pour récupérer les tâches de groupe.
export const fetchGroupTasks = createAsyncThunk(
	"task/fetchGroupTasks",
	async (groupIds, { getState, rejectWithValue }) => {
		const { selectedDate, selectedTags, selectedGroupTags } = getState().task;
		const tagsStr = [...selectedTags, ...selectedGroupTags].join(",");
		try {
			const groupTasksObj = {};
			await Promise.all(
				groupIds.map(async (groupId) => {
					const fetchedTasks = await taskService.fetchGroupTasks(
						groupId,
						new Date(selectedDate),
						tagsStr
					);
					const tasksWithValidation = await Promise.all(
						fetchedTasks.map(async (task) => {
							const validated = await taskService.hasTaskBeenValidatedOnDate(
								task.id,
								selectedDate
							);
							return { ...task, validated };
						})
					);
					groupTasksObj[groupId] = tasksWithValidation;
				})
			);
			return groupTasksObj;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

// L'action asynchrone pour récupérer toutes les tâches par groupe.
export const fetchAllTasksByGroup = createAsyncThunk(
	"task/fetchAllTasksByGroup",
	async (groupId, { rejectWithValue }) => {
		try {
			// Tentative de récupération des tâches à partir de l'API.
			const fetchedTasks = await taskService.findAllTasksByGroup(groupId);
			return fetchedTasks.map((task) => ({
				id: task.id,
				title: task.title,
				tags: task.tags,
				recurrences: task.recurrences, // Assurez-vous que les recurrences sont incluses ici
			}));
		} catch (err) {
			// En cas d'erreur, rejet de la valeur avec le message d'erreur.
			return rejectWithValue(err.message);
		}
	}
);

// Fonction helper pour calculer le nombre total de tâches et de tâches de groupe
const calculateTotalTasks = (state) => {
	return state.tasks.length + Object.values(state.groupTasks).flat().length;
};

// Création du slice de tâche avec Redux Toolkit.
const taskSlice = createSlice({
	name: "task", // Le nom du slice.
	initialState: {
		// L'état initial du slice.
		tasks: [], // La liste des tâches.
		groupTasks: {}, // La liste des tâches de groupe.
		totalTasks: 0, // Le nombre total de tâches.
		personnalTasks: [],
		allGroupTasks: [],
		status: "idle", // Le statut de l'état (idle, loading, etc.).
		error: null, // L'erreur éventuelle lors de la récupération des tâches.
		selectedDate: new Date().toISOString(), // La date sélectionnée.
		selectedTags: [], // Les tags sélectionnés.
		selectedGroupTags: [], // Les tags de groupe sélectionnés.
	},

	// Les reducers pour mettre à jour l'état.
	reducers: {
		setSelectedDate: (state, action) => {
			// Le reducer pour mettre à jour la date sélectionnée.
			state.selectedDate = action.payload;
		},
		setSelectedTags: (state, action) => {
			// Le reducer pour mettre à jour les tags sélectionnés.
			state.selectedTags = action.payload;
		},
		setSelectedGroupTags: (state, action) => {
			state.selectedGroupTags = action.payload;
		},
	},

	// Les extraReducers pour gérer les actions asynchrones.
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.status = "idle";
				state.tasks = action.payload;
				// Utilisation de la fonction helper pour calculer le nombre total de tâches
				state.totalTasks = calculateTotalTasks(state);
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			})
			// Gestion de fetchGroupTasks
			.addCase(fetchGroupTasks.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchGroupTasks.fulfilled, (state, action) => {
				state.status = "idle";
				state.groupTasks = { ...state.groupTasks, ...action.payload };
				// Utilisation de la fonction helper pour calculer le nombre total de tâches
				state.totalTasks = calculateTotalTasks(state);
			})

			.addCase(fetchGroupTasks.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			})

			.addCase(fetchAllPersonnalTasks.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAllPersonnalTasks.fulfilled, (state, action) => {
				state.status = "idle";
				state.personnalTasks = action.payload;
			})
			.addCase(fetchAllPersonnalTasks.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			})
			.addCase(fetchAllTasksByGroup.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAllTasksByGroup.fulfilled, (state, action) => {
				state.status = "idle";
				state.allGroupTasks = action.payload;
			})
			.addCase(fetchAllTasksByGroup.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			});
	},
});

// Exportation des actions du slice de tâche.
export const taskSliceActions = taskSlice.actions;
// Exportation du slice de tâche.
export default taskSlice;
