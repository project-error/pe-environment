import PlayerService from './player.service';

on('playerJoining', async () => {
  const _source = (global as any).source;

  await PlayerService.handleNewPlayer(_source);
});

on('playerDropped', () => {
  const _source = (global as any).source;

  PlayerService.removePlayer(_source);
});
