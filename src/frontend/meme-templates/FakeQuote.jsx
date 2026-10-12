import s from "./FakeQuote.module.css";

export default function FakeQuote({ image, text, author }) {
    return (
        <div className={s.container}>
            <div className={s.words_container}>
                <p className={s.quote}>{text}</p>
                <p className={s.author}>{author}</p>
            </div>

            <img className={s.image} src={image} alt="Fake quote author in black and white" />
        </div>
    );
}
