import { useEffect, useState, useContext } from "react";

import { FileContext } from "../context/FileContext.jsx";

import { getMemeCount } from "../api/memes.js";

import s from "./MemeCount.module.css";

export default function MemeCount() {
    const [count, setCount] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);

    const { file } = useContext(FileContext);

    useEffect(() => {
        getMemeCount()
            .then(count => {
                setCount(count);
                setIsSuccess(true);
            })
            .catch(() => setCount(null));
    }, []);

    useEffect(() => {
        if (!file) return;

        setCount(count + 1);
    }, [file]);

    return count === null ? null : <span className={`${s.text_count} ${isSuccess ? s.show : ""}`}>Total de memes creados: {count}</span>;
}