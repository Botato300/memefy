import s from "./Footer.module.css";

export default function Footer() {
    const MY_WEB = "https://tomasbottari.com/";

    return (
        <footer className={s.footer}>
            <small>Hecho por <a href={MY_WEB} target="_blank">Tomás Bottari</a> - 2025</small>
        </footer>
    );
}