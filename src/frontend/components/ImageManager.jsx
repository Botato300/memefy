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
                <span className={s.title}>Add some text and you're done...</span>
            </>
        );

    return (
        <>
            <DropZone setFile={setFile} />
            <span className={s.title}>Choose an image to memeify</span>
        </>
    );
}