import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { card_variant, character_variant } from './variants';
import { useEvent, useMedia } from 'react-use';
import { card, character, container } from './index.module.css';
import smoke from './effects';
import creed_src from './assets/creed.webp';
import character_src from './assets/character.webp';

export default function Card({ parent }) {
  const
    [getCardState, setCardState] = useState(true),
    [getInnerWidth, setInnerWidth] = useState(parent.current.clientWidth),
    [getInnerHeight, setInnerHeight] = useState(parent.current.clientHeight),
    x = useMotionValue(getInnerWidth / 2), y = useMotionValue(getInnerHeight / 2),
    rotateX = useTransform(y, [0, getInnerHeight], [20, -20]),
    rotateY = useTransform(x, [0, getInnerWidth], [-20, 20]),
    isHoverable = useMedia('(any-hover: hover)');

  useEvent('mousemove', event => {
    if (isHoverable && getCardState) {
      x.set(event.clientX);
      y.set(event.clientY);
    }
  }, parent.current);

  useEffect(smoke.bind(parent, {
    getInnerWidth, setInnerWidth,
    getInnerHeight, setInnerHeight
  }), []);

  return (
    <motion.div
      className={`${container} flex-ai-jc-center`}
      style={isHoverable && getCardState ? { rotateX, rotateY } : undefined}
      animate={getCardState ? 'default' : 'rotated'}
      onClick={setCardState.bind(null, state => !state)}
    >
      <motion.div
        className={`${card} flex-ai-jc-center`}
        variants={card_variant}
        transition={{ duration: .8, }}
      >
        <img src={creed_src} />
      </motion.div>
      <motion.img
        className={`${character}`}
        src={character_src}
        variants={character_variant}
        transition={{ duration: .8 }}
      />
      <p>Click the card</p>
    </motion.div>
  );
};