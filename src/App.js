import React from 'react';
import { CutInput } from './cut-input';

function App() {
  return (
    <div className="App">
      <CutInput
        sizes={[2, {validator: '\\d', maxLength: 3}]}
        transform={'uppercase'}
        // value="A.Q"
      />
    </div>
  );
}

export default App;
