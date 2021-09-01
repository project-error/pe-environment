import PlayerService from './player.service';

on('playerJoining', async () => {
  const _source = (global as any).source;
  console.log('fuck face hello');

  await PlayerService.handleNewPlayer(_source);
});

on('playerDropped', () => {
  const _source = (global as any).source;

  PlayerService.removePlayer(_source);
});
