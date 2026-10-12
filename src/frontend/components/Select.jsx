import s from "./Select.module.css";

export default function Select({ label, children, ...props }) {
    return (
        <label className={s.container}>
            <span>{label}</span>
            <div className={s.control}>
                <select {...props} className={s.select}>
                    {children}
                </select>

                <svg className={s.arrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24px" height="24px" fill="currentColor">
                    <path d="M480-345 240-585l56-56 184 183 184-183 56 56-240 240Z" />
                </svg>
            </div>
        </label>
    );
}
