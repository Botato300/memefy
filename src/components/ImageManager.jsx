import { useState } from "react";

import DropZone from "./DropZone.jsx";
import ImageEditor from "./ImageEditor.jsx";

export default function ImageManager() {
    const [file, setFile] = useState(null);
    console.log("renderizado pa");

    if (file)
        return <ImageEditor imgFile={file} />;

    return <DropZone setFile={setFile} />;
}