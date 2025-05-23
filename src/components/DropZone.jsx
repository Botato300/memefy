import { useRef, useEffect } from "react";
import s from "./DropZone.module.css";

export default function DropZone({ setFile }) {
    const elementInput = useRef(null);

    useEffect(() => {
        document.onpaste = handlePaste;
    }, []);

    function handleDrop(event) {
        event.preventDefault();

        const files = event.dataTransfer.files;

        if (!files.length || !files[0].type.startsWith("image/"))
            return;

        setFile(files[0]);
    }

    function handlePaste(event) {
        const files = event.clipboardData.files;

        if (!files.length) {
            console.log("No se encontró una imagen para pegar");
            return;
        }

        setFile(files[0]);
    }

    function handleFileChange(event) {
        const files = event.target.files;

        if (!files.length || !files[0].type.startsWith("image/"))
            return;

        setFile(files[0]);
    }

    return (
        <div className={s.dropzone}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            onPaste={handlePaste}
            onClick={() => elementInput.current.click()}
        >
            <ImageUploadIcon />
            <div className={s.text_instruction}>
                <span>Arrastra y suelta </span> una imagen
                <br />
                o <span>haz clic</span> para elegir una
            </div>

            <input onChange={handleFileChange} ref={elementInput} type="file" accept="image/*" />

            <span className={s.tip}><span>Tip:</span> puedes pegar la imagen con <kbd>Ctrl</kbd> + <kbd>V</kbd></span>
        </div>
    );
}

function ImageUploadIcon() {
    return (
        <svg className={s.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="150" height="150" fill="#000000">
            <path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm480-280v-167l-64 63-56-56 160-160 160 160-56 56-64-63v167h-80Z" />
        </svg>
    );
}