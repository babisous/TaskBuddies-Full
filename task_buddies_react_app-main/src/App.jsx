import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./routes/Router"; // Importez votre fichier Routers

import store from "./store/store";
import { Provider } from "react-redux";
import Layout from "./components/Layout";

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Layout>
					<Routers />
				</Layout>
			</Router>
		</Provider>
	);
};
export default App;
