import { useEffect, useRef, useState } from 'react';
import { getRadian } from '../../utility/utility';
import Display from '../Display/Display';
import PointerDisplay from '../PointerDisplay/PointerDisplay';

import styles from './Speedometer.module.css';

interface ISpeedometer {
    value: number;
}

const Speedometer = (props:ISpeedometer) => {
    const spMeterRef = useRef({}) as React.RefObject<HTMLDivElement>;
    const [size, setSize] = useState(0);

    const low=0;
    const high=220;
    const diff = 360-high;
    
    const angleStartOffset = 90 + (diff/2);
    const arcStartRad = getRadian(angleStartOffset);
    const arcEndRad = getRadian(angleStartOffset+high);
    let indicatorEnd = getRadian(angleStartOffset+props.value);

    useEffect(() => {
        const spMeter = spMeterRef.current;
        if(spMeter) {
            setSize(spMeter.offsetWidth);
            window.addEventListener('resize', () => {
                if(size !== spMeter?.offsetWidth){
                    setSize(spMeter.offsetWidth);
                }
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
                    low={low}
                    high={high}
                    value={+indicatorEnd.toFixed(2)}
                    width={10}
                >
                <Display value={""+props.value} />
                </PointerDisplay>
            </div>
        </article>
        
    );
};

export default Speedometer;