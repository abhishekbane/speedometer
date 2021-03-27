import { useEffect, useRef, useState } from 'react';
import { getRadian } from '../../utility/utility';
import Display from '../Display/Display';
import Scale from '../Scale/Scale';

import styles from './Speedometer.module.css';

const Speedometer = () => {
    const spMeterRef = useRef({}) as React.RefObject<HTMLDivElement>;
    const [size, setSize] = useState(0);

    const low=0;
    const high=220;
    const diff = 360-high;
    
    const angleStartOffset = 90 + (diff/2);
    
    const arcStartRad = getRadian(angleStartOffset);
    const arcEndRad = getRadian(angleStartOffset+high);
    let indicatorEnd = getRadian(angleStartOffset)+Math.random();

    useEffect(() => {
        const spMeter = spMeterRef.current;
        if(spMeter) {
            setSize(spMeter.offsetWidth);
        }
    }, []);
    return (
        <div ref={spMeterRef} className={styles.speedometer}>
            <Display value="20" />
            <Scale
                radius={180}
                size={size}
                arcEndRad={arcEndRad}
                arcStartRad={arcStartRad}
                low={low}
                high={high}
            />
        </div>
    );
};

export default Speedometer;