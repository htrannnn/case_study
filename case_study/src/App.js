import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import NavigationComponent from "./components/NavigationComponent";
import { Routes, Route } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import FacilitiesListComponent from "./components/FacilitiesListComponent";
import DetailComponent from "./components/DetailComponent";
import EditComponent from "./components/EditComponent";

function App() {
	return (
		<>
			<HeaderComponent />
			<NavigationComponent />
			<Routes>
				<Route path={"/homepage/facilitiesList"} element={<FacilitiesListComponent />} />
				<Route path={"/facilitiesList/detail/:id"} element={<DetailComponent />} />
				<Route path={"/facilitiesList/detail/edit/:id"} element={<EditComponent />} />
			</Routes>
			<FooterComponent />
		</>
	);
}

export default App;
