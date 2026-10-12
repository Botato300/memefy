import s from "./MemeShowcase.module.css";

export default function MemeShowcase() {
    return (
        <section className={s.container}>
            <h3 className={s.title}>A variety of templates for your memes</h3>
            <div className={s.carousel}>
                <img
                    src="/fake-quote-meme.webp"
                    alt="Fake quote meme featuring Jeffrey Epstein with the text 'Age is just a number...'"
                    width="200"
                    height="150" />
                <img
                    src="/saturated-meme.webp"
                    alt="Saturated meme featuring a distorted image and the caption 'Those who know 💀'"
                    width="200"
                    height="150" />
                <img
                    src="/preview.jpg"
                    alt="Memefy meme maker promotional image featuring a shrugging emoji and the text 'Meme maker, not much to explain, bro'"
                    width="200"
                    height="150" />
            </div>
        </section>
    );
}