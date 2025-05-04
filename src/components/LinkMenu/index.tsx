import styles from './styles.module.css';

type LinkMenuProps = {
    children: React.ReactNode;
}

export function LinkMenu({ children }: LinkMenuProps) {
    return (
        <a href="" className={styles.linkMenuLinks}>
            { children }
        </a>
    );
}