import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import DropZone from "./components/DropZone.jsx";

import "./assets/css/global.css";

export default function App() {


	return (
		<>
			<Header />

			<main>
				<DropZone />
			</main>


			<Footer />
		</>
	);
}