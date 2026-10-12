import { useRef, useEffect, useState } from "react";
import { toBlob } from "html-to-image";

import { memeTemplates } from "../meme-templates";
import Notification from "./Notification.jsx";
import Select from "./Select.jsx";
import s from "./ImageEditor.module.css";

export default function ImageEditor({ imgFile }) {
    const previewRef = useRef(null);
    const viewportRef = useRef(null);
    const menuRef = useRef(null);

    const [templateId, setTemplateId] = useState(memeTemplates[0].id);
    const [fields, setFields] = useState({ text: "", author: "" });
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1);
    const [exporting, setExporting] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [notification, setNotification] = useState("");

    const currentTemplate = memeTemplates.find(({ id }) => id === templateId);
    const imageAvailable = image?.file === imgFile;

    useEffect(() => {
        const url = URL.createObjectURL(imgFile);
        setImage({ file: imgFile, url });
        setErrorMessage("");

        return () => URL.revokeObjectURL(url);
    }, [imgFile]);

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / currentTemplate.width));

        observer.observe(viewportRef.current);

        return () => observer.disconnect();
    }, [currentTemplate.width]);

    useEffect(() => {
        if (!notification)
            return;

        const timeout = setTimeout(() => setNotification(""), 3000);
        return () => clearTimeout(timeout);
    }, [notification]);

    function openContextMenu(event) {
        event.preventDefault();

        if (!imageAvailable || exporting)
            return;

        const menu = menuRef.current;
        const bounds = viewportRef.current.getBoundingClientRect();
        const x = event.clientX || bounds.left + bounds.width / 2;
        const y = event.clientY || bounds.top + bounds.height / 2;

        viewportRef.current.focus();

        menu.showPopover();
        menu.style.left = `${window.scrollX + Math.max(8, Math.min(x, window.innerWidth - menu.offsetWidth - 8))}px`;
        menu.style.top = `${window.scrollY + Math.max(8, Math.min(y, window.innerHeight - menu.offsetHeight - 8))}px`;
        menu.querySelector("button").focus();
    }

    async function generateImage() {
        const node = previewRef.current;

        const blob = await toBlob(node, {
            width: currentTemplate.width,
            height: currentTemplate.height,
            pixelRatio: 1,
            style: { transform: "none" },
        });

        if (!blob)
            throw new Error("Could not generate PNG");

        return blob;
    }

    async function handleExport(action) {
        if (!imageAvailable || exporting)
            return;

        menuRef.current.hidePopover();

        setExporting(true);
        setErrorMessage("");
        setNotification("");

        try {
            if (action === "copy") {
                await navigator.clipboard.write([new ClipboardItem({ "image/png": generateImage() })]);

                setNotification("Image copied.");
            } else {
                const url = URL.createObjectURL(await generateImage());
                const link = document.createElement("a");

                link.href = url;
                link.download = `${imgFile.name.replace(/\.[^.]+$/, "")}-memefy.png`;

                document.body.appendChild(link);

                link.click();
                link.remove();

                URL.revokeObjectURL(url);

                setNotification("Image downloaded.");
            }
        } catch (error) {
            console.error("Could not export meme: ", error);
            setErrorMessage(action === "copy" ? "Could not copy the image." : "Could not download the meme =(");
        } finally {
            setExporting(false);
        }
    }

    return (
        <div className={s.editor}>
            <Select label="Meme template" value={templateId} onChange={event => setTemplateId(event.target.value)} disabled={exporting}>
                {memeTemplates.map(({ id, label }) => (
                    <option key={id} value={id}>{label}</option>
                ))}
            </Select>

            <div
                className={s.viewport}
                ref={viewportRef}
                style={{ aspectRatio: `${currentTemplate.width} / ${currentTemplate.height}` }}
                tabIndex={0}
                onContextMenu={openContextMenu}
            >
                <div ref={previewRef} className={s.preview} style={{ width: currentTemplate.width, height: currentTemplate.height, transform: `scale(${scale})` }}>
                    {imageAvailable && <currentTemplate.Component image={image.url} {...fields} />}
                </div>
            </div>

            <div
                ref={menuRef}
                popover="auto"
                className={s.contextMenu}
                onBlur={event => {
                    if (!event.currentTarget.contains(event.relatedTarget) && event.currentTarget.matches(":popover-open"))
                        event.currentTarget.hidePopover();
                }}
            >
                <button onClick={() => handleExport("copy")} disabled={!imageAvailable || exporting}>
                    Copy image
                </button>
            </div>

            {currentTemplate.fields.map(({ name, label, placeholder }) => (
                <label className={s.field} key={name}>
                    {label}
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={fields[name] ?? ""}
                        disabled={exporting}
                        onChange={event => setFields({ ...fields, [name]: event.target.value })}
                    />
                </label>
            ))}

            {errorMessage && <p>{errorMessage}</p>}

            {notification && <Notification message={notification} />}

            <button className={s.btnDownload} onClick={() => handleExport("download")} disabled={!imageAvailable || exporting}>
                <DownloadIcon />
                <span>DOWNLOAD</span>
            </button>
        </div>
    );
}

function DownloadIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={s.icon} width="24" height="24" fill="#000000"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg>;
}
