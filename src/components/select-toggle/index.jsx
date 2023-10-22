import { motion } from 'framer-motion';
import { arrow_variant } from './variants';
import arrow from './assets/arrow.svg';
import { drawer_toggle } from './index.module.css';

function Select_Toggle({ state, toggle }) {
    return (
        <div
            className={`${drawer_toggle} flex-ai-center`}
            data-select-toggle
            onClick={toggle}
        >
            <motion.img
                src={arrow}
                alt='arrow'
                data-select-toggle
                variants={arrow_variant}
                initial='closed'
                animate={state ? 'opened' : 'closed'}
                transition={{ duration: .5, ease: 'easeInOut' }}
            />
            <p data-select-toggle>Examples</p>
        </div>
    )
}

export { Select_Toggle };