import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

function Layout(props) {
	const location = useLocation();
	const isLoginPage = location.pathname === "/login";

	return (
		<>
			{!isLoginPage && <Navbar />}
			{props.children}
		</>
	);
}

export default Layout;
