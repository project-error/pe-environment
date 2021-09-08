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
