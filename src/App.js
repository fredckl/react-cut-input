import React from 'react';
import CutInput from './cut-input';

function App() {
  return (
    <div className="App">
      <CutInput
        sizes={[2, 2]}
        value="A.Q"
      />
    </div>
  );
}

export default App;
