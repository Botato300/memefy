import { useContext } from "react";

import { FileContext } from "../context/FileContext.jsx";

import DropZone from "./DropZone.jsx";
import ImageEditor from "./ImageEditor.jsx";

import s from "./ImageManager.module.css";

export default function ImageManager() {
    const { file, setFile } = useContext(FileContext);

    if (file)
        return (
            <>
                <ImageEditor imgFile={file} />
                <span className={s.title}>Escríbele un texto y ya lo tienes...</span>
            </>
        );

    return (
        <>
            <DropZone setFile={setFile} />
            <span className={s.title}>Elige una imagen para memeficar</span>
        </>
    );
}