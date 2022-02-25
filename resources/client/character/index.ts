import { CharacterEvents } from '../../shared/events';
import { CharacterProps } from '../../shared/types/character';

on('playerSpawned', () => {
  emitNet(CharacterEvents.GET_CHARACTERS);
});

RegisterCommand(
  'getchar',
  () => {
    emitNet(CharacterEvents.GET_CHARACTERS);
  },
  false,
);

onNet(CharacterEvents.SEND_CHARACTERS, (characters: CharacterProps) => {
  console.log('doing shit in client');
  SendNUIMessage({
    action: 'getCharacters',
    data: characters,
  });
  SendNUIMessage({
    action: 'setVisible',
    data: true,
  });
  SetNuiFocus(true, true);
});

// Yes, I am aware of that we can do this better, but guess what...I don't care.
RegisterNuiCallbackType(CharacterEvents.SELECT_CHARACTER);
on(`__cfx_nui:${CharacterEvents.SELECT_CHARACTER}`, (character: CharacterProps, cb: any) => {
  cb(true);
  emitNet(CharacterEvents.SELECT_CHARACTER, character);
  /*SendNUIMessage({
    action: 'setVisible',
    data: false,
  });*/
  SetNuiFocus(false, false);
});

// HA! any again, and guess what...I don't care
RegisterNuiCallbackType(CharacterEvents.CREATE_CHARACTER);
on(`__cfx_nui:${CharacterEvents.CREATE_CHARACTER}`, (data: any, cb: any) => {
  cb({});
  emitNet(CharacterEvents.CREATE_CHARACTER, data);
});
