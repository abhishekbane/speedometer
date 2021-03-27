

import styles from './Display.module.css';

interface IDisplayProps {
    value: string;
}

export const MAX_CHARS = 3;

const Display = (props: IDisplayProps) => {
    
    let value = props.value;
    while(value.length<MAX_CHARS) {
        console.log("as");
        value = "0"+value;
    }
    return (
        <div className={styles.displayContainer}>
            <div className={styles.display}>
                <div className={styles.contentBox}>
                    <span className={styles.speed} >{value}</span>
                    <span className={styles.unit}>kmh</span>
                </div>
            </div>
        </div>
    );
};

export default Display;