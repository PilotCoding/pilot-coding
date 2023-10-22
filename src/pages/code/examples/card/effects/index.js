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