import React from 'react';

import Speedometer from '../../components/Speedometer/Speedometer';

import './App.css';

function App() {
  return (
    <div className="App">
      <Speedometer low={0} high={220} value={0} showRandomSpeed/>
    </div>
  );
}

export default App;
