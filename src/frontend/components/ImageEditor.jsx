import { useRef, useMemo, useEffect, useState } from "react";

import s from "./ImageEditor.module.css";

export default function ImageEditor({ imgFile }) {
    const canvasRef = useRef(null);

    const [text, setText] = useState("");

    const imageURL = useMemo(() => URL.createObjectURL(imgFile), [imgFile]);

    useEffect(() => {
        const imageData = new Image();
        imageData.src = imageURL;

        imageData.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d", { alpha: false });

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgWidth = 500;
            const imgHeight = 400;

            const imgX = (canvasWidth - imgWidth) / 2;
            const imgY = 20;

            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            ctx.fillStyle = "#303030";
            ctx.fillRect(imgX, imgY, imgWidth, imgHeight);

            ctx.filter = "contrast(100)";
            ctx.drawImage(imageData, imgX, imgY, imgWidth, imgHeight);

            ctx.filter = "none";
            ctx.font = "400 32px Impact";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(text.toUpperCase(), canvasWidth / 2, imgY + imgHeight + 10);
        };
    }, [text, imgFile]);

    function handleTextChange(event) {
        setText(event.target.value);
    }

    function handleDownloadClick() {
        const nameWithoutExtension = imgFile.name.substring(0, imgFile.name.lastIndexOf("."));
        const fileName = nameWithoutExtension + ".png";

        const canvas = canvasRef.current;
        const url = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    return (
        <div className={s.container}>
            <div className={s.editor}>
                <canvas width="600" height="500" ref={canvasRef}></canvas>

                <input
                    onChange={handleTextChange}
                    type="text"
                    placeholder="Escribe el texto aquí"
                    value={text}
                />
                <button className={s.btnDownload} onClick={handleDownloadClick}>
                    <DownloadIcon />
                    <span>DESCARGAR</span>
                </button>
            </div>
        </div>
    );
}

function DownloadIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={s.icon} width="24" height="24" fill="#000000"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg>;
}