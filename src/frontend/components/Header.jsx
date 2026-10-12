import s from "./Header.module.css";

export default function Header() {
    const NAME_APP = "Memefy";

    return (
        <header className={s.header}>
            <a href="/">
                <img src="/logo.webp" alt={`${NAME_APP} logo`} className={s.logo} />
                <h1>{NAME_APP}</h1>
            </a>
        </header>
    );
}