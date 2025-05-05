import { useState } from "react";

import DropZone from "./components/DropZone";

import "./assets/css/App.css";

export default function App() {
	const [files, setFiles] = useState([]);

	function handleEventDrop(event) {
		event.preventDefault();

		setFiles([...event.dataTransfer.files]);
	}

	function handleEventPaste(event) {
		const { files } = event.clipboardData;
		setFiles([...files]);
	}

	return (
		<>
			<h1>Generador de memes</h1>

			<DropZone handleEventDrop={handleEventDrop} handleEventPaste={handleEventPaste}>
				<span>Soltar aqui</span>
			</DropZone>

			{
				files.map(file => (
					<img src={URL.createObjectURL(file)} width="300" height="200" />
				))
			}
		</>
	);
}