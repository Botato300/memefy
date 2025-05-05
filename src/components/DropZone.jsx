import styles from "./DropZone.module.css";

export default function DropZone({ children, handleEventDrop, handleEventPaste }) {

    return (
        <div className={styles.container}
            onDrop={handleEventDrop}
            onDragOver={(event) => event.preventDefault()}
            onPaste={handleEventPaste}
        >
            {children}
        </div>
    );
}