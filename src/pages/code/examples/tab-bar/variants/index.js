const
    background_variant = {
        user: { background: 'rgba(255,205,210,.9)' },
        image: { background: 'rgba(187,222,251, .9)' },
        plus: { background: 'rgba(200,230,201,.9)' },
        bell: { background: 'rgba(225,190,231,.9)' },
        cart: { background: 'rgba(255,224,178,.9)' }
    },
    bubble_variant = {
        user: {
            left: '5.4%',
            background: background_variant.user.background,
            scaleY: [.75, 1.25, 1.0],
            transition: { scaleY: { duration: 2, type: 'spring', bounce: .8 } }
        },
        image: {
            left: '24.2%',
            background: background_variant.image.background,
            scaleY: [.75, 1.25, 1.0],
            transition: { scaleY: { duration: 2, type: 'spring', bounce: .8 } }
        },
        plus: {
            left: '42.75%',
            background: background_variant.plus.background,
            scaleY: [.75, 1.25, 1.0],
            transition: { scaleY: { duration: 2, type: 'spring', bounce: .8 } }
        },
        bell: {
            left: '61.65%',
            background: background_variant.bell.background,
            scaleY: [.75, 1.25, 1.0],
            transition: { scaleY: { duration: 2, type: 'spring', bounce: .8 } }
        },
        cart: {
            left: '80.2%',
            background: background_variant.cart.background,
            scaleY: [.75, 1.25, 1.0],
            transition: { scaleY: { duration: 2, type: 'spring', bounce: .8 } }
        }
    };

export { background_variant, bubble_variant };