import s from "./Saturated.module.css";

export default function Saturated({ image, text }) {
    return (
        <div className={s.container}>
            <img className={s.image} src={image} alt="Saturated meme" />
            <p className={s.text}>{text}</p>
        </div>
    );
}
