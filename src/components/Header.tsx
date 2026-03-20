import styles from '../styles/Header.module.css'

export function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.titleBlock}>
                <div className={styles.logo} />
                <h1 className={styles.title}>TSearch</h1>
            </div>
            <div className={styles.actions}>
                <div className={styles.actionBar}/>
                <div className={styles.actionDot}/>
            </div>
        </div>
    )
}