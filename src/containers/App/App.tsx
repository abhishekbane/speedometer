import React from 'react';

import Speedometer from '../../components/Speedometer/Speedometer';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Speedometer low={0} high={220} value={0} showRandomSpeed/>
    </div>
  );
}

export default App;
