import { menu_toggle } from './index.module.css';

function Menu_Toggle({toggle}) {
    return (
        <ul 
            className={`${menu_toggle} flex-ai-center`} 
            data-menu-toggle
            onClick={toggle}
        >
            <li data-menu-toggle></li>
            <li data-menu-toggle></li>
            <li data-menu-toggle></li>
        </ul>
    )
}

export { Menu_Toggle };