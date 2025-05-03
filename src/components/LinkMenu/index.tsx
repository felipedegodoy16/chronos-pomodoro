import styles from './styles.module.css';

type LinkMenuProps = {
    children: React.ReactNode;
}

export function LinkMenu({ children }: LinkMenuProps) {
    return (
        <nav className={styles.linkMenu}>
            <a href="" className={styles.linkMenuLinks}>
                { children }
            </a>
        </nav>
    );
}