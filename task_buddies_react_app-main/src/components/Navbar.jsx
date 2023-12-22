import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon as FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendarDay,
	faArrowRightFromBracket,
	faUserGear,
	faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, taskSliceActions } from "../store/dashboard/task";

import "../styles/Navbar.scss";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const selectedDateStr = useSelector((state) => state.task.selectedDate);
	const selectedDate = new Date(selectedDateStr);

	const capitalize = (s) => {
		if (typeof s !== "string") return "";
		return s.charAt(0).toUpperCase() + s.slice(1);
	};

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch, selectedDateStr]);

	const handleDateChange = (newDate) => {
		dispatch(taskSliceActions.setSelectedDate(newDate.toISOString()));
		dispatch(fetchTasks());
	};

	const logout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};
	const customFormatDate = (date) => {
		let diff = moment(date)
			.startOf("day")
			.diff(moment().startOf("day"), "days");
		let day = format(date, "eee", { locale: fr });
		let rest = format(date, "d MMM", { locale: fr });
		let formattedDate = `${capitalize(day)} ${capitalize(rest)}`;

		switch (diff) {
			case 0:
				formattedDate = `Aujourd'hui, ${formattedDate}`;
				break;
			case -1:
				formattedDate = `Hier, ${formattedDate}`;
				break;
			case 1:
				formattedDate = `Demain, ${formattedDate}`;
				break;
			default:
				break;
		}

		return formattedDate;
	};
	let formattedDate = customFormatDate(selectedDate);

	return (
		<nav className="navbarContainer">
			<div className="navbarLogo">
				<img src="/img/Logo.svg" className="logoNav" />
			</div>
			<div className="navbarDate">
				<p onClick={() => document.getElementById("datePicker").focus()}>
					{formattedDate}
				</p>
				<DatePicker
					id="datePicker"
					selected={selectedDate}
					onChange={(date) => handleDateChange(date)}
					locale={fr}
					customInput={
						<FontAwesomeIcon className="calendarIcon" icon={faCalendarDay} />
					}
				/>
			</div>
			<div className="navbarLinks">
				<Link
					to="/dashboard"
					className={
						location.pathname === "/dashboard" ? "linkIcon active" : "linkIcon"
					}
				>
					<FontAwesomeIcon icon={faTableColumns} />
				</Link>
				<Link
					to="/profil"
					className={
						location.pathname === "/profil" ? "linkIcon active" : "linkIcon"
					}
				>
					<FontAwesomeIcon icon={faUserGear} />
				</Link>
				<button onClick={logout} className="logoutBtn">
					<FontAwesomeIcon icon={faArrowRightFromBracket} />
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
