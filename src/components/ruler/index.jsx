import { ruler } from './index.module.css';

const ticks = [];

for (let tick = -900; tick < 1000; tick += 100) {
    ticks.push(tick);
}

function Ruler() {
    return (
        <ul className={`${ruler} flex-ai-jc-center`}>
            {
                ticks.map(tick => {
                    return (
                        <li className={`flex-ai-center`} key={tick}>
                            <p>
                                {
                                    tick
                                }
                            </p>
                            <div></div>
                        </li>
                    );
                })
            }
        </ul>
    )
}

export { Ruler };