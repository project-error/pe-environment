import { CharacterEvents } from '../../shared/events';

on('playerSpawned', () => {
  emitNet(CharacterEvents.GET_CHARACTERS);
});

RegisterCommand(
  'getchars',
  () => {
    emitNet(CharacterEvents.GET_CHARACTERS);
  },
  false,
);

onNet(CharacterEvents.SEND_CHARACTERS, (characters: any) => {
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
on(`__cfx_nui:${CharacterEvents.SELECT_CHARACTER}`, (character: any) => {
  emitNet(CharacterEvents.SELECT_CHARACTER, character);
  SendNUIMessage({
    action: 'setVisible',
    data: false,
  });
  SetNuiFocus(false, false);
});
