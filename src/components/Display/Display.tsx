

import styles from './Display.module.css';

interface IDisplayProps {
    value: string;
}

const Display = (props: IDisplayProps) => {
    
    return (
        <div className={styles.displayContainer}>
            <div className={styles.display}>
                <div className={styles.contentBox}>
                    <span className={styles.speed} >{props.value}</span>
                    <span className={styles.unit}>kmh</span>
                </div>
            </div>
        </div>
    );
};

export default Display;