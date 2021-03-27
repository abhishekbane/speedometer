import React, { useEffect } from 'react';

import Speedometer from '../../components/Speedometer/Speedometer';
import { useRandomSpeed } from '../../hooks/RandomSpeed';

import './App.css';

function App() {
  let {speed, generateRandomSpeed} = useRandomSpeed(0, 0, 220);
  useEffect(() => {
    generateRandomSpeed();
  },[]);
  
  return (
    <div className="App">
      <Speedometer value={speed} />
    </div>
  );
}

export default App;
