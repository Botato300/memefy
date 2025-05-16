import s from "./Header.module.css";

export default function Header() {
    const NAME_APP = "Memefy";

    return (
        <header className={s.header}>
            <h1>{NAME_APP} - Generador de memes</h1>
        </header>
    );
}