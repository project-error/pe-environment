import React, { useState } from 'react';
import './App.css';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { debugData } from '../utils/debugData';
import { fetchNui } from '../utils/fetchNui';

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
        characterId: 1,
        name: 'Fee male',
      },
      {
        characterId: 2,
        name: 'Male',
      },
    ],
  },
]);

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [characters, setCharacters] = useState<any[]>([]);

  useNuiEvent<boolean>('setVisible', (data) => {
    setIsVisible(data);
  });

  useNuiEvent<any[]>('getCharacters', (data) => {
    console.log('got chars nui', data);
    setCharacters(data);
  });

  const selectCharacter = (character: any) => {
    console.log('nui character', character);
    fetchNui('pe:characterSelected', { id: character.characterId, name: character.name }).then((resp) => {
      setIsVisible(false);
    });
  };

  return (
    <>
      {isVisible && (
        <div className="nui-wrapper">
          <h1>Character Selection</h1>
          {characters.map((char: any) => (
            <div key={char.characterId} className="char-container">
              <div className="char-box">
                <p>{char.name}</p>
                <button onClick={() => selectCharacter(char)} className="char-button">
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default App;
