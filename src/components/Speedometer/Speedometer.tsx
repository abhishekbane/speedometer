import { useEffect, useRef, useState } from 'react';
import { useRandomSpeed } from '../../hooks/RandomSpeed';
import { getRadian } from '../../utility/utility';
import Display from '../Display/Display';
import PointerDisplay from '../PointerDisplay/PointerDisplay';

import styles from './Speedometer.module.css';

interface ISpeedometer {
    low: number;
    high: number;
    value?: number;
    showRandomSpeed?: boolean
}

const Speedometer = (props:ISpeedometer) => {
    let {randSpeed, generateRandomSpeed} = useRandomSpeed(props.low, props.high, 10);
        useEffect(() => {
            generateRandomSpeed();
    },[]);

    const value = props.value!==undefined && !props.showRandomSpeed ? props.value : randSpeed;

    const spMeterRef = useRef({}) as React.RefObject<HTMLDivElement>;
    const [size, setSize] = useState(0);

    const diff = 360-(props.high-props.low);
    const angleStartOffset = 90 + (diff/2);
    const arcStartRad = getRadian(angleStartOffset);
    const arcEndRad = getRadian(angleStartOffset+(props.high-props.low));
    let indicatorEnd = getRadian(angleStartOffset+value-props.low);

    useEffect(() => {
        const spMeter = spMeterRef.current;
        if(spMeter) {
            setSize(spMeter.offsetWidth);
            window.addEventListener('resize', () => {
                setSize(spMeter.offsetWidth);
            });
        }
    }, []);
    
    return (
        <article className={styles.spMetercontainer}>
            <div ref={spMeterRef} className={styles.speedometer}>
                <PointerDisplay 
                    radius={size>0?(size-20)/2:100}
                    size={size}
                    arcEndRad={+arcEndRad.toFixed(2)}
                    arcStartRad={+arcStartRad.toFixed(2)}
                    low={props.low}
                    high={props.high}
                    value={+indicatorEnd.toFixed(2)}
                    width={10}
                >
                <Display value={""+value} />
                </PointerDisplay>
            </div>
        </article>
        
    );
};

export default Speedometer;