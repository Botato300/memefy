import { FileProvider } from "./context/FileContext.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ImageManager from "./components/ImageManager.jsx";
import MemeShowcase from "./components/MemeShowcase.jsx";
import MemeCount from "./components/MemeCount.jsx";

import "./assets/css/global.css";
import s from "./components/App.module.css";

export default function App() {

	return (
		<>
			<Header />

			<main>
				<FileProvider>
					<div className={s.hero_container}>
						<h2 className={s.title_main}>Crea un <span>meme</span> en cuestión de segundos</h2>
						<MemeCount />
					</div>

					<ImageManager />
				</FileProvider>

				<MemeShowcase />
			</main>

			<Footer />
		</>
	);
}