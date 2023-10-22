import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import arrow_svg from './assets/arrow.svg';
import { carousel_reflection_variant, carousel_variant } from './variants';
import copy_data from './data';
import { carousel_image, copy, prev, next, reflection } from './index.module.css';

const images = Object.values(import.meta.glob('./assets/*.jpg', { as: 'url', eager: true }));

export default function Carousel({ parent }) {
  const
    [carouselState, setCarouselState] = useState([1, 2, 3]),
    [playing, setPlaying] = useState(false);

  function cycle(newValue) {
    if (!playing) {
      setCarouselState(carouselState.map(oldValue => {
        let value = oldValue + newValue;
        newValue > 0 ?
          value > 3 ? value = 1 : undefined :
          value < 1 ? value = 3 : undefined;
        return value;
      }));
    }
  }

  useEffect(_ => {
    parent.current.style.background = 'linear-gradient(to bottom, transparent 50%, white)';
    return _ => parent.current.style.background = '';
  }, [])

  return (
    <>
      <div className={`${copy}`}>
        <h1>{copy_data[carouselState[0] - 1][0]}</h1>
        <h2>{copy_data[carouselState[0] - 1][1]}</h2>
      </div>

      <motion.img
        src={arrow_svg}
        className={`${prev}`}
        title='Prev'
        onClick={cycle.bind(null, -1)}
      />

      {
        images.map((url, index) => {
          return (
            <Fragment key={url}>
              <motion.img
                src={url}
                alt='Carousel image'
                className={`${carousel_image}`}
                variants={carousel_variant}
                animate={carouselState[index].toString()}
                onAnimationStart={index == 1 ? setPlaying.bind(null, true) : null}
                onAnimationComplete={index == 1 ? setPlaying.bind(null, false) : null}
                transition={{ duration: 1 }}
              />
              <motion.img
                src={url}
                alt='Carousel image reflection'
                className={`${carousel_image} ${reflection}`}
                variants={carousel_reflection_variant}
                initial={{ y: 'clamp(225px,70.3125vw,450px)', rotateY: '180deg' }}
                animate={carouselState[index].toString()}
                transition={{ duration: 1, rotateZ: { duration: 0 } }}
              />
            </Fragment>
          );
        })
      }

      <motion.img
        src={arrow_svg}
        className={`${next}`}
        title='Next'
        onClick={cycle.bind(null, 1)}
      />
    </>
  );
};