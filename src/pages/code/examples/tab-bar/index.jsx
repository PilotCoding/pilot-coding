import { useState } from 'react';
import { motion } from 'framer-motion';
import { BiBell, BiCart, BiImage, BiPlusCircle } from "react-icons/bi";
import user from './assets/user.jpg';
import { background_variant, bubble_variant } from './variants';
import { bubble, container, tabbar, imageIcon, plusIcon, bellIcon, cartIcon, userIcon } from './index.module.css';

export default function TabBar() {
    const [tabbarState, setTabbarState] = useState('user');

    return (
        <motion.div
            className={`${container} flex-ai-jc-center`}
            variants={background_variant}
            initial='user'
            animate={tabbarState}
            transition={{ duration: 1 }}
        >
            <ul className={`${tabbar} flex-ai-center`}>

                <li className={`flex-ai-jc-center`}>
                    <img src={user}
                        className={`${userIcon}`}
                        onClick={setTabbarState.bind(null, 'user')} />
                </li>
                <li className={`flex-ai-jc-center`}>
                    <BiImage
                        className={`${imageIcon}`}
                        onClick={setTabbarState.bind(null, 'image')} />
                </li>
                <li className={`flex-ai-jc-center`}>
                    <BiPlusCircle
                        className={`${plusIcon}`}
                        onClick={setTabbarState.bind(null, 'plus')} />
                </li>
                <li className={`flex-ai-jc-center`}>
                    <BiBell
                        className={`${bellIcon}`}
                        onClick={setTabbarState.bind(null, 'bell')} />
                </li>
                <li className={`flex-ai-jc-center`}>
                    <BiCart
                        className={`${cartIcon}`}
                        onClick={setTabbarState.bind(null, 'cart')} />
                </li>

                <motion.div
                    className={`${bubble}`}
                    variants={bubble_variant}
                    initial='user'
                    animate={tabbarState}
                ></motion.div>
            </ul>
        </motion.div>
    );
};