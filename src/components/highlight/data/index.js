export default [
    {
        id: 'card',
        files: [
            {
                id: 0,
                name: 'card.jsx',
                language: 'js',
                data: `
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
            className={'{container} flex-ai-jc-center'}
            style={isHoverable && getCardState ? { rotateX, rotateY } : undefined}
            animate={getCardState ? 'default' : 'rotated'}
            onClick={setCardState.bind(null, state => !state)}
        >
            <motion.div
                className={[{card} flex-ai-jc-center[]}
                variants={card_variant}
                transition={{ duration: .8, }}
            >
                <img src={creed_src} />
            </motion.div>
            <motion.img
                className={'{character}'}
                src={character_src}
                variants={character_variant}
                transition={{ duration: .8 }}
            />
            <p>Click the card</p>
        </motion.div>
    );
};            
`
            }, {
                id: 1,
                name: 'card.css',
                language: 'css',
                data: `
.container {
    z-index: 1;
    cursor: pointer;
    flex-direction: column;
}

.card {
    margin-bottom: 14px;
    outline: 2px solid rgb(var(--color-3));
    outline-offset: 7px;
    border-radius: 20px;
    max-width: 300px;
    width: 50vw;
    aspect-ratio: 1/1.5;
    background: rgba(var(--color-5), .5);
    backdrop-filter: blur(10px);
    overflow: hidden;
}

.character {
    opacity: 0;
    position: absolute;
}



.card_example,
.container {
    perspective: 2000px;
}
`
            }, {
                id: 3,
                name: 'smoke.js',
                language: 'js',
                data: `
import smoke from './shaders/smoke';

export default function Smoke({
    getInnerWidth, 
    setInnerWidth, 
    getInnerHeight, 
    setInnerHeight
}) {
    const
        uniforms = {},
        smokeShader = new PIXI.AbstractFilter('',
            smoke,
            uniforms
        ),
        stage = new PIXI.Container(),
        renderer = new PIXI.autoDetectRenderer(
            getInnerWidth,
            getInnerHeight,
            {
                backgroundAlpha: 0
            }
        ),
        bg = PIXI.Sprite.fromImage(''),
        resize = _ => {
            bg.width = this.current.clientWidth;
            bg.height = this.current.clientHeight;

            smokeShader.uniforms.resolution.value = {
                x: this.current.clientWidth,
                y: this.current.clientHeight
            };
            renderer.resize(
                this.current.clientWidth,
                this.current.clientHeight
            );

            setInnerWidth(this.current.clientWidth);
            setInnerHeight(this.current.clientHeight);
        };

    this.current.appendChild(renderer.view);

    uniforms.resolution = {
        type: 'v2', value: {
            x: getInnerWidth,
            y: getInnerHeight
        }
    };
    uniforms.alpha = { type: '1f', value: 0.0 };
    uniforms.shift = { type: '1f', value: 1.6 };
    uniforms.time = { type: '1f', value: 0 };
    uniforms.speed = { type: 'v2', value: { x: 0.7, y: 0.4 } };

    bg.width = getInnerWidth;
    bg.height = getInnerHeight;
    bg.filters = [smokeShader];

    stage.addChild(bg);

    addEventListener('resize', resize);

    let frame, count = 0;

    function animate() {
        frame = requestAnimationFrame(animate);

        count += 0.01;
        smokeShader.uniforms.time.value = count;

        renderer.render(stage);
    }

    animate();

    return _ => {
        cancelAnimationFrame(frame);
        removeEventListener('resize', resize);
        this.current.removeChild(renderer.view);
        renderer.destroy(renderer.view);
    };
};               
`
            }, {
                id: 4,
                name: 'shader.js',
                language: 'js',
                data: `
export default '
precision mediump float;
uniform vec2      resolution;
uniform float     time;
uniform float     alpha;
uniform vec2      speed;
uniform float     shift;


float rand(vec2 n) {
        return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 n) {
        const vec2 d = vec2(0.0, 1.0);
        vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
        return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float fbm(vec2 n) {
        float total = 0.0, amplitude = 1.0;
        for (int i = 0; i < 4; i++) {
        total += noise(n) * amplitude;
        n += n;
        amplitude *= 0.5;
        }
        return total;
}

void main() {
    const vec3 c1 = vec3(126.0/255.0, 0.0/255.0, 97.0/255.0);
    const vec3 c2 = vec3(173.0/255.0, 0.0/255.0, 161.4/255.0);
    const vec3 c3 = vec3(0.2, 0.0, 0.0);
    const vec3 c4 = vec3(164.0/255.0, 255.0/255.0, 214.4/255.0);
    const vec3 c5 = vec3(0.1);
    const vec3 c6 = vec3(0.9);

    vec2 p = gl_FragCoord.xy * 8.0 / resolution.xx;
    float q = fbm(p - time * 0.1);
    vec2 r = vec2(fbm(p + q + time * speed.x - p.x - p.y), fbm(p + q - time * speed.y));
    vec3 c = mix(c1, c2, fbm(p + r)) + mix(c3, c4, r.x) - mix(c5, c6, r.y);
    float grad = gl_FragCoord.y / resolution.y;
    gl_FragColor = vec4(c * cos(shift * gl_FragCoord.y / resolution.y), 1.0);
    gl_FragColor.xyz *= 1.0-grad;
}';               
`
            }
        ]
    }, {
        id: 'carousel',
        files: [
            {
                id: 0,
                name: 'carousel.jsx',
                language: 'js',
                data: `
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
            <div className={'{copy}'}>
                <h1>{copy_data[carouselState[0] - 1][0]}</h1>
                <h2>{copy_data[carouselState[0] - 1][1]}</h2>
            </div>

            <motion.img
                src={arrow_svg}
                className={'{prev}'}
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
                                className={'{carousel_image}'}
                                variants={carousel_variant}
                                animate={carouselState[index].toString()}
                                onAnimationStart={index == 1 ? setPlaying.bind(null, true) : null}
                                onAnimationComplete={index == 1 ? setPlaying.bind(null, false) : null}
                                transition={{ duration: 1 }}
                            />
                            <motion.img
                                src={url}
                                alt='Carousel image reflection'
                                className={'{carousel_image} {reflection}'}
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
                className={'{next}'}
                title='Next'
                onClick={cycle.bind(null, 1)}
            />
        </>
    );
};  
`
            }, {
                id: 1,
                name: 'carousel.css',
                language: 'css',
                data: `
.copy {
    z-index: 4;
    color: rgb(255, 255, 255);
    bottom: 33px;
    padding: clamp(10px, 3.125vw, 20px);
    text-shadow: 0 0 10px rgba(0, 0, 0, .75);
}

.copy>h1 {
    font-size: clamp(20px, 6.25vw, 34px);
}

.copy>h2 {
    font-size: clamp(12px, 3.75vw, 18px);
}

.prev {
    left: 20px;
    transform: rotateZ(90deg);
}

.next {
    right: 20px;
    transform: rotateZ(-90deg);
}

.prev,
.next {
    z-index: 3;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid rgb(var(--color-5));
    padding: 8px;
    width: 30px;
    height: 30px;
    background: rgba(var(--color-4), .8);
}

.prev,
.next,
.copy,
.carousel_image {
    position: absolute;
}

.carousel_image {
    border-radius: 20px;
    border: 10px solid white;
    width: clamp(150px, 46.875vw, 300px);
    aspect-ratio: 1/1.45;
    box-shadow: 0px 0px 10px rgba(0, 0, 0.15);
}

.reflection {
    opacity: .17;
    transform: rotateY(180deg);
    -webkit-mask-image: url('./assets/reflection-mask.webp');
    mask-image: url('./assets/reflection-mask.webp');
    -webkit-mask-size: contain;
    mask-size: contain;
}         
`
            }
        ]
    }, {
        id: 'tab-bar',
        files: [
            {
                id: 0,
                name: 'tab-bar.jsx',
                language: 'js',
                data: `
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
            className={'{container} flex-ai-jc-center'}
            variants={background_variant}
            initial='user'
            animate={tabbarState}
            transition={{ duration: 1 }}
        >
            <ul className={'{tabbar} flex-ai-center'}>
                <li className={'flex-ai-jc-center'}>
                    <img src={user}
                        className={'{userIcon}'}
                        onClick={setTabbarState.bind(null, 'user')} />
                </li>
                <li className={'flex-ai-jc-center'}>
                    <BiImage
                        className={'{imageIcon}'}
                        onClick={setTabbarState.bind(null, 'image')} />
                </li>
                <li className={'flex-ai-jc-center'}>
                    <BiPlusCircle
                        className={'{plusIcon}'}
                        onClick={setTabbarState.bind(null, 'plus')} />
                </li>
                <li className={'flex-ai-jc-center'}>
                    <BiBell
                        className={'{bellIcon}'}
                        onClick={setTabbarState.bind(null, 'bell')} />
                </li>
                <li className={'flex-ai-jc-center'}>
                    <BiCart
                        className={'{cartIcon}'}
                        onClick={setTabbarState.bind(null, 'cart')} />
                </li>
                <motion.div
                    className={'{bubble}'}
                    variants={bubble_variant}
                    initial='user'
                    animate={tabbarState}
                ></motion.div>
            </ul>
        </motion.div>
    );
};               
`
            }, {
                id: 1,
                name: 'tab-bar.css',
                language: 'css',
                data: `
.container {
    width: 100%;
    height: inherit;
}

.tabbar {
    position: relative;
    column-gap: 20px;
    justify-content: space-evenly;
    border-radius: clamp(10px, 3.125vw, 20px);
    padding: 20px;
    background: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, .25);
}

.tabbar>li {
    cursor: pointer;
    width: 40px;
    height: 40px;
}

.tabbar img {
    border-radius: 50%;
    border: 3px solid darkgray;
    width: 40px;
    height: 40px;
}

.userIcon,
.imageIcon,
.plusIcon,
.bellIcon,
.cartIcon {
    z-index: 1;
    position: relative;
    fill: gray;
    width: 30px;
    height: 30px;
}

.imageIcon:hover {
    fill: rgb(138, 183, 220);
}

.plusIcon:hover {
    fill: rgb(147, 209, 148);
}

.bellIcon:hover {
    fill: rgb(193, 136, 202);
}

.cartIcon:hover {
    fill: rgb(209, 158, 127);
}

.userIcon:hover,
.imageIcon:hover,
.plusIcon:hover,
.bellIcon:hover,
.cartIcon:hover {
    transform: scale(1.1);
}

.bubble {
    z-index: 0;
    position: absolute;
    border-radius: 50%;
    width: 46px;
    height: 46px;
    top: 17px;
}
`
            }
        ]
    }
];