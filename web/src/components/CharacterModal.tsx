import React, { useState } from 'react';
import { fetchNui } from '../utils/fetchNui';

interface CharacterModalProps {
  onClose: () => void;
  createCharacter: (name: string) => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ onClose, createCharacter }) => {
  const [name, setName] = useState('');

  return (
    <div className="character-modal">
      <h4>Hello, create a character! RP is fun</h4>
      <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 6, paddingRight: 6 }}>
        <input
          placeholder="Character name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          style={{
            border: 'none',
            outline: 'none',
            padding: '6px 16px',
          }}
        />
        <button
          style={{
            marginTop: 5,
            width: '100%',
            padding: '10px 16px',
          }}
          onClick={() => createCharacter(name)}
        >
          Spawn hybrid
        </button>
        <button
          style={{
            marginTop: 5,
            width: '100%',
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CharacterModal;
