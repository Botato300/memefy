import s from "./MemeShowcase.module.css";

export default function MemeShowcase() {
    return (
        <section className={s.container}>
            <h3 className={s.title}>A variety of templates for your memes</h3>
            <div className={s.carousel}>
                <img src="/preview.jpg" width="200" height="150" />
                <img src="/preview.jpg" width="200" height="150" />
                <img src="/preview.jpg" width="200" height="150" />
            </div>
        </section>
    );
}