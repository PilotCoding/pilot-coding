const
    carousel_variant = {
        '1': {
            scale: 0.8,
            rotateY: '45deg',
            filter: 'brightness(.5)',
            x: 'calc(clamp(150px,46.875vw,300px) * -1)',
            transitionEnd: {
                zIndex: 0
            }
        },
        '2': {
            zIndex: 2,
            filter: 'brightness(1)'
        },
        '3': {
            scale: 0.8,
            rotateY: '-45deg',
            filter: 'brightness(.5)',
            x: 'calc(clamp(150px,46.875vw,300px) * 1)',
            transitionEnd: {
                zIndex: 1
            }
        },
    },
    carousel_reflection_variant = {
        '1': {
            scale: 0.8,
            rotateY: '225deg',
            rotateZ: '180deg',
            filter: 'brightness(.25)',
            x: 'calc(clamp(150px,46.875vw,300px) * -1)',
            y: 'clamp(180px,56.25vw,360px)',
            transitionEnd: {
                zIndex: 0
            }
        },
        '2': {
            zIndex: 2,
            scale: 1,
            rotateY: '180deg',
            rotateZ: '180deg',
            filter: 'brightness(1)',
            y: 'clamp(225px,70.3125vw,450px)',
        },
        '3': {
            scale: 0.8,
            rotateY: '135deg',
            rotateZ: '180deg',
            filter: 'brightness(.25)',
            x: 'calc(clamp(150px,46.875vw,300px)* 1)',
            y: 'clamp(180px,56.25vw,360px)',
            transitionEnd: {
                zIndex: 1
            }
        },
    };

export { carousel_variant, carousel_reflection_variant };