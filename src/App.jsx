import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ImageManager from "./components/ImageManager.jsx";

import "./assets/css/global.css";
import s from "./components/App.module.css";

export default function App() {

	return (
		<>
			<Header />

			<main>
				<h2 className={s.title_main}>Crea un <span>meme</span> en cuestión de segundos</h2>
				<ImageManager />
			</main>

			<Footer />
		</>
	);
}