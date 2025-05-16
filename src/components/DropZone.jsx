import { useState } from "react";

import s from "./DropZone.module.css";
import Editor from "./Editor.jsx";

export default function DropZone() {
    const [files, setFiles] = useState([]);

    function handleEventDrop(event) {
        event.preventDefault();

        setFiles([...files, ...event.dataTransfer.files]);
    }

    function handleEventPaste(event) {
        const data = event.clipboardData;
        setFiles([...files, ...data.files]);
    }

    function handleEventChange(event) {
        setFiles([...files, ...event.target.files]);
    }

    return (
        <>
            <div className={s.dropzone}
                onDrop={handleEventDrop}
                onDragOver={(event) => event.preventDefault()}
                onPaste={handleEventPaste}
            >
                <input onChange={handleEventChange} type="file" multiple accept="image/*" />
                <span>―― o ――</span>
                <span>Puedes arrastrar y soltar los archivos aquí</span>
                <span>También puedes pegar los archivos aquí</span>
            </div>

            {
                files.map(file => (
                    <Editor imgFile={file} key={crypto.randomUUID()} />
                ))
            }
        </>
    );
}