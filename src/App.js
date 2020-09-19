import React from 'react';
import { SplitterInput } from './splitter-input';

function App() {
  return (
    <div className="App">
      <SplitterInput
        sizes={[2, 2]}
        value="A.Q"
      />
    </div>
  );
}

export default App;
