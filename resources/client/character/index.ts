import { CharacterEvents } from '../../shared/events';

on('playerSpawned', () => {
  emitNet(CharacterEvents.GET_CHARACTERS);
});

onNet(CharacterEvents.SEND_CHARACTERS, (characters: any) => {
  SendNUIMessage({
    action: 'getCharacters',
    data: characters,
  });
});

// Yes, I am aware of that we can do this better, but guess what...I don't care.
RegisterNuiCallbackType(CharacterEvents.SELECT_CHARACTER);
on(`__cfx_nui:${CharacterEvents.SELECT_CHARACTER}`, (character: any) => {
  emitNet(CharacterEvents.SELECT_CHARACTER, character);
});
