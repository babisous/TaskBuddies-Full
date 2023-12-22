import { useEffect } from "react";

const PageTitle = ({ suffix }) => {
	useEffect(() => {
		document.title = `TaskBuddies${suffix ? " - " + suffix : ""}`;
	}, [suffix]);

	return null;
};

export default PageTitle;
