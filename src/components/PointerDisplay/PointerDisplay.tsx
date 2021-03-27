

import Indicator from '../Indicator/Indicator';
import Scale from '../Scale/Scale';

import styles from './PointerDisplay.module.css';

interface IPointerDisplayProps {
    radius: number;
    size: number;
    arcStartRad: number;
    arcEndRad: number;
    low: number;
    high: number;
    value: number;
    width: number;
    children: React.ReactNode;
}

const PointerDisplay = (props: IPointerDisplayProps) => {
    return (
        <div className={styles.pointerDisplay}>
            
            <div className={styles.overlap}>
                <Scale
                    radius={props.radius-20}
                    size={props.size}
                    arcEndRad={props.arcEndRad}
                    arcStartRad={props.arcStartRad}
                    low={props.low}
                    high={props.high}
                    arcBedRadius={props.radius-10}
                    arcBedWidth={props.width}
                />
            </div>
            
            <div className={styles.overlap}>
                <Indicator 
                    radius={props.radius-10}
                    size={props.size}
                    arcEndRad={props.arcEndRad}
                    arcStartRad={props.arcStartRad}
                    low={props.low}
                    high={props.high}
                    value={props.value}
                    width={props.width}
                />
            </div>

            <div className={`${styles.overlap} ${styles.displayContainer}`}>
                {props.children}
            </div>
            
        </div>
    );
}

export default PointerDisplay;