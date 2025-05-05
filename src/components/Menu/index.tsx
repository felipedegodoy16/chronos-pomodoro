import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';

import styles from './styles.module.css';
import { useState, useEffect } from 'react';

type AvailableTheme = 'dark' | 'light';

export function Menu() {
    const [theme, setTheme] = useState<AvailableTheme>(() => {
        const storageTheme = (localStorage.getItem('theme') as AvailableTheme) || 'dark';
        return storageTheme;
    });

    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />,
    }

    function handleThemeChange(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();

        setTheme(prevTheme => {
            const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
            return nextTheme;
        })
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    return (
        <nav className={styles.menu}>
            <a href="#" className={styles.menuLink} aria-label='Ir para a Home' title='Ir para a Home'>
                <HouseIcon />
            </a>

            <a href="#" className={styles.menuLink} aria-label='Ir para o Histórico' title='Ir para o Histórico'>
                <HistoryIcon />
            </a>

            <a href="#" className={styles.menuLink} aria-label='Ir para as Configurações' title='Ir para as Configurações'>
                <SettingsIcon />
            </a>

            <a href="#" className={styles.menuLink} aria-label='Mudar o Tema' title='Mudar o Tema' onClick={handleThemeChange}>
                {nextThemeIcon[theme]}
            </a>
        </nav>
    );
}