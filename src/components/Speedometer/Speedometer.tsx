import Display from '../Display/Display';

import styles from './Speedometer.module.css';

const Speedometer = () => {
    return (
        <div className={styles.speedometer}>
            <Display value="10" />
        </div>
    );
};

export default Speedometer;