import PlayerService from './player.service';

on('playerJoining', () => {
  const _source = (global as any).source;

  PlayerService.handleNewPlayer(_source);
});

on('playerDropped', () => {
  const _source = (global as any).source;

  PlayerService.removePlayer(_source);
});
