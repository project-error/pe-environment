import React, { useState } from 'react';
import './App.css';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { debugData } from '../utils/debugData';
import { fetchNui } from '../utils/fetchNui';
import { useExitListener } from '../hooks/useExitListener';

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: 'setVisible',
    data: true,
  },
]);

debugData([
  {
    action: 'getCharacters',
    data: [
      {
        id: 1,
        name: 'Fee male',
      },
      {
        id: 2,
        name: 'Male',
      },
    ],
  },
]);

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [characters, setCharacters] = useState<any[]>([]);

  useNuiEvent<boolean>('setVisible', (data) => {
    // This is our handler for the setVisible action.
    console.log(data);
    setIsVisible(data);
  });

  useNuiEvent<any[]>('getCharacters', (data) => {
    // This is our handler for the setVisible action.
    console.log(data);
    setCharacters(data);
  });

  useExitListener(setIsVisible);

  return (
    <div className="nui-wrapper">
      {characters.map((char: any) => (
        <div key={char.id} className="char-container">
          <div className="char-box">
            <p>{char.name}</p>
            <button>Select</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
