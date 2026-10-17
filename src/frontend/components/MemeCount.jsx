import { useEffect, useState, useContext } from "react";

import { FileContext } from "../context/FileContext.jsx";

import { getMemeCount } from "../api/memes.js";

import s from "./MemeCount.module.css";

export default function MemeCount() {
    const [count, setCount] = useState(null);

    const { file } = useContext(FileContext);

    useEffect(() => {
        if (navigator.onLine) {
            getMemeCount()
                .then(setCount)
                .catch(() => setCount(null));
        }
    }, []);

    useEffect(() => {
        if (!file)
            return;

        setCount(count => count === null ? null : count + 1);
    }, [file]);

    return (
        <span className={`${s.text_count} ${count !== null ? s.show : ""}`}>
            Total memes created: {count ?? 0}
        </span>
    );
}