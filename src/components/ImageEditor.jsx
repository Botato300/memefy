import { useRef, useEffect, useState } from "react";

import s from "./ImageEditor.module.css";

export default function ImageEditor({ imgFile }) {
    const canvasRef = useRef(null);
    const [text, setText] = useState("");

    useEffect(() => {
        const imageData = new Image();
        imageData.src = URL.createObjectURL(imgFile);

        imageData.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            const imgWidth = 500;
            const imgHeight = 400;
            const imgX = (canvasWidth - imgWidth) / 2;
            const imgY = 20;

            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            ctx.fillStyle = "#999";
            ctx.fillRect(imgX - 2, imgY - 2, imgWidth + 4, imgHeight + 4);

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

    function handleEventChange(event) {
        setText(event.target.value);
    }

    function handleEventClick() {
        const canvas = canvasRef.current;
        const url = canvas.toDataURL("image/png", 0.1);

        const link = document.createElement("a");
        link.href = url;
        link.download = "lol";
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    return (
        <div className={s.editor}>
            <canvas width="600" height="500" ref={canvasRef}></canvas>

            <input
                onChange={handleEventChange}
                type="text"
                placeholder="Escribe el texto aquí"
                value={text}
            />
            <button onClick={handleEventClick}>Descargar</button>
        </div>
    );
}
