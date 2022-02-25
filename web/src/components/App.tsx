import React, { useState } from 'react';
import './App.css';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { debugData } from '../utils/debugData';
import { fetchNui } from '../utils/fetchNui';
import CharacterModal from './CharacterModal';

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
        name: 'Female',
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
  const [modal, setModal] = useState(false);

  useNuiEvent<boolean>('setVisible', (data) => {
    setIsVisible(data);
  });

  useNuiEvent<any[]>('getCharacters', (data) => {
    setCharacters(data);
  });

  const selectCharacter = (character: any) => {
    fetchNui('pe:characterSelected', { characterId: character.characterId, name: character.name }).then((resp) => {
      setIsVisible(false);
    });
  };

  const createCharacter = async (name: string) => {
    await fetchNui('pe:createCharacter', { name });
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      {isVisible && (
        <div className="nui-wrapper">
          {modal && <CharacterModal onClose={closeModal} createCharacter={createCharacter} />}
          <h1>Character Selection</h1>
          <button onClick={openModal} className="char-button">
            New char
          </button>
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
