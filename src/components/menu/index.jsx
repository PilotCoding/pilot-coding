import { Fragment, useRef } from 'react';
import { useClickAway } from 'react-use';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { menu_variant } from './variants';
import { links } from './data';
import me from './assets/brian.jpg';
import { heading, list, menu, info, resume, separator, user } from './index.module.css';

function Menu({ state, toggle }) {
    const menu_ref = useRef();

    useClickAway(menu_ref, event => {
        event.target.dataset.menuToggle ?
            undefined :
            state && toggle()
    });

    return (
        <motion.div
            ref={menu_ref}
            className={`${menu}`}
            variants={menu_variant}
            initial='closed'
            animate={state ? 'opened' : 'closed'}
            transition={{ duration: .5, ease: 'easeInOut' }}
        >
            <img src={me} className={user} />
            <hgroup className={`${info}`}>
                <h1>Brian Pilot</h1>
                <h2>Dallas, Tx.</h2>
            </hgroup>
            <Link
                target='_blank'
                to='/BrianPilotResume.pdf'
                className={`${resume}`}
            >
                Resume PDF
            </Link>
            {
                links.map(link => {
                    return (
                        <Fragment key={link.heading}>
                            <hr className={`${separator}`} />
                            <h3 className={`${heading}`}>{link.heading}:</h3>
                            <ul className={`${list}`}>
                                {
                                    link.items.map(item => {
                                        return (
                                            <li key={item.name}><Link target='_blank' to={item.url}>{item.name}</Link></li>
                                        );
                                    })
                                }
                            </ul>
                        </Fragment>
                    );
                })
            }
        </motion.div>
    );
}

export { Menu };