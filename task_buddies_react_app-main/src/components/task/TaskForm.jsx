import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { taskService } from "../../services/taskService";
import TagList from "../tag/TagList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import TagForm from "../tag/TagForm";

import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, taskSliceActions } from "../../store/dashboard/task";

import TagListForForm from "../tag/TagListForForm";

const FormTask = ({ handleBackClick }) => {
	const token = localStorage.getItem("token");

	const [showTagForm, setShowTagForm] = useState(false);

	const dispatch = useDispatch();

	const [title, setTitle] = useState("");
	const [recurrenceType, setRecurrenceType] = useState("Unique");
	const [selectedWeekDays, setSelectedWeekDays] = useState([]);
	const [selectedDayOfMonth, setSelectedDayOfMonth] = useState([]);
	const [selectedInterval, setSelectedInterval] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [idSelected, setIdSelected] = useState(null);

	const [errorText, setErrorText] = useState("");

	const initForm = () => {
		setTitle("");
		setRecurrenceType("Unique");
		setSelectedWeekDays([]);
		setSelectedDayOfMonth([]);
		setSelectedInterval(null);
		setStartDate(null);
		setEndDate(null);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			// Réinitialisez le texte d'erreur
			setErrorText("");

			// Vérifiez si les champs obligatoires sont remplis
			if (!idSelected) {
				setErrorText("Veuillez choisir un tag.");
				return;
			}

			if (!title) {
				setErrorText("Le champ 'Nom de la tâche' est obligatoire.");
				return;
			}

			if (recurrenceType === "Semaine" && selectedWeekDays.length === 0) {
				setErrorText("Veuillez sélectionner au moins un jour de la semaine.");
				return;
			}

			if (recurrenceType === "Mois" && selectedDayOfMonth.length === 0) {
				setErrorText("Veuillez sélectionner au moins un jour du mois.");
				return;
			}

			if (recurrenceType === "Intervalle" && !selectedInterval) {
				setErrorText("Veuillez sélectionner un intervalle.");
				return;
			}

			if (!startDate) {
				setErrorText("Veuillez sélectionner une date de début.");
				return;
			}

			const recurrences = generateRecurrenceData();

			await taskService.addTask(title, recurrences, idSelected);
			dispatch(fetchTasks());
			initForm();

			// Fermez le formulaire
			handleBackClick();
		} catch (error) {
			console.error("Failed to add task:", error);
		}
	};

	const handleWeekDayToggle = (day) => {
		const updatedWeekDays = [...selectedWeekDays];
		const index = updatedWeekDays.indexOf(day);

		if (index !== -1) {
			updatedWeekDays.splice(index, 1);
		} else {
			updatedWeekDays.push(day);
		}

		setSelectedWeekDays(updatedWeekDays);
	};

	const handleDayOfMonthToggle = (day) => {
		const updatedDaysOfMonth = [...selectedDayOfMonth];
		const index = updatedDaysOfMonth.indexOf(day);

		if (index !== -1) {
			updatedDaysOfMonth.splice(index, 1);
		} else {
			updatedDaysOfMonth.push(day);
		}

		setSelectedDayOfMonth(updatedDaysOfMonth);
	};

	const generateRecurrenceData = () => {
		const recurrences = [];

		if (recurrenceType === "Unique") {
			const recurrenceData = {
				start_date: startDate?.toISOString(),
				end_date: null,
				day_of_week: null,
				day_of_month: null,
				recurrence_interval: null,
			};
			recurrences.push(recurrenceData);
		} else if (recurrenceType === "Semaine") {
			selectedWeekDays.forEach((day) => {
				const recurrenceData = {
					start_date: startDate?.toISOString(),
					end_date: endDate?.toISOString(),
					day_of_week: day,
					day_of_month: null,
					recurrence_interval: null,
				};
				recurrences.push(recurrenceData);
			});
		} else if (recurrenceType === "Mois") {
			selectedDayOfMonth.forEach((day) => {
				const recurrenceData = {
					start_date: startDate?.toISOString(),
					end_date: endDate?.toISOString(),
					day_of_week: null,
					day_of_month: day,
					recurrence_interval: null,
				};
				recurrences.push(recurrenceData);
			});
		} else if (recurrenceType === "Intervalle") {
			const recurrenceData = {
				start_date: startDate?.toISOString(),
				end_date: endDate?.toISOString(),
				day_of_week: null,
				day_of_month: null,
				recurrence_interval: selectedInterval,
			};
			recurrences.push(recurrenceData);
		}

		return recurrences;
	};

	const weekDays = [
		{ name: "L", value: 1 },
		{ name: "M", value: 2 },
		{ name: "M", value: 3 },
		{ name: "J", value: 4 },
		{ name: "V", value: 5 },
		{ name: "S", value: 6 },
		{ name: "D", value: 7 },
	];

	const dayOfMonthOptions = Array.from({ length: 31 }, (_, index) => index + 1);

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Ajouter une tâche 💡</p>
				<button onClick={handleBackClick} className="closeHeaderBtn">
					<FontAwesomeIcon icon={faCircleMinus} />
				</button>
			</div>
			<TagListForForm
				idSelected={idSelected}
				setIdSelected={setIdSelected}
				onAddTag={() => setShowTagForm(true)}
			/>
			<div className="bodyContainer">
				{showTagForm && <TagForm setShowTagForm={setShowTagForm} />}

				<form onSubmit={handleFormSubmit}>
					<div className="inputContainer">
						<label htmlFor="title">Nom de la tâche</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(event) => setTitle(event.target.value)}
							placeholder="Titre de la tâche"
						/>
					</div>
					<div className="inputContainer">
						<label htmlFor="recurrenceType">Type de récurrences</label>
						<select
							id="recurrenceType"
							value={recurrenceType}
							onChange={(event) => setRecurrenceType(event.target.value)}
						>
							<option value="Unique">Unique</option>
							<option value="Semaine">Semaine</option>
							<option value="Mois">Mois</option>
							<option value="Intervalle">Intervalle</option>
						</select>
					</div>
					{recurrenceType === "Semaine" && (
						<div className="inputContainer">
							<label>Sélectionnez les jours de la semaine:</label>
							<div className="checkboxesContainer">
								{weekDays.map((day) => (
									<label key={day.value} className="checkbox-container">
										<input
											type="checkbox"
											checked={selectedWeekDays.includes(day.value)}
											onChange={() => handleWeekDayToggle(day.value)}
										/>
										<span className="checkmark">{day.name}</span>
									</label>
								))}
							</div>
						</div>
					)}
					{recurrenceType === "Mois" && (
						<div className="inputContainer">
							<label>Sélectionnez les jours du mois:</label>
							<div className="checkboxesContainer" id="monthDayList">
								{dayOfMonthOptions.map((day) => (
									<label key={day} className="checkbox-container">
										<input
											type="checkbox"
											checked={selectedDayOfMonth.includes(day)}
											onChange={() => handleDayOfMonthToggle(day)}
										/>
										<span className="checkmark">{day}</span>
									</label>
								))}
							</div>
						</div>
					)}
					{recurrenceType === "Intervalle" && (
						<div className="inputContainer">
							<label htmlFor="selectedInterval">
								Sélectionnez un intervalle:
							</label>
							<input
								type="number"
								id="selectedInterval"
								value={selectedInterval}
								onChange={(event) =>
									setSelectedInterval(Number(event.target.value))
								}
								required
							/>
						</div>
					)}
					<div className="inputContainer">
						<label>Date{recurrenceType != "Unique" && " de début"} :</label>
						<DatePicker
							selected={startDate}
							onChange={(date) => setStartDate(date)}
						/>
					</div>
					{recurrenceType != "Unique" && (
						<div className="inputContainer">
							<label>Date de fin:</label>
							<DatePicker
								selected={endDate}
								onChange={(date) => setEndDate(date)}
							/>
						</div>
					)}

					<div className="inputContainer">
						{errorText && <div className="errorText">{errorText}</div>}
						<button type="submit">Ajouter</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FormTask;
