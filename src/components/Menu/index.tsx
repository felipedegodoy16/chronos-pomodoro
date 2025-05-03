import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';
import { LinkMenu } from '../LinkMenu';

import styles from './styles.module.css';

export function Menu() {
    return (
        <nav className={styles.menu}>
            <LinkMenu>
                <HouseIcon />
            </LinkMenu>

            <LinkMenu>
                <HistoryIcon />
            </LinkMenu>
            
            <LinkMenu>
                <SettingsIcon />
            </LinkMenu>
            
            <LinkMenu>
                <SunIcon />
            </LinkMenu>
        </nav>
    );
}