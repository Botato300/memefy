import s from "./MemeShowcase.module.css";

export default function MemeShowcase() {
    return (
        <section className={s.container}>
            <h3 className={s.title}>Variedad de plantilla para tus memes</h3>
            <div className={s.carousel}>
                <img src="/preview.png" width="200" height="150" />
                <img src="/preview.png" width="200" height="150" />
                <img src="/preview.png" width="200" height="150" />
            </div>
        </section>
    );
}