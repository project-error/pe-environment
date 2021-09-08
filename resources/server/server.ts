import 'reflect-metadata';
import { container, injectable } from 'tsyringe';
import { PlayerController } from './player/player.controller';
import { CharacterController } from './character/character.controller';

@injectable()
class Server {
  constructor(public playerController: PlayerController, public characterController: CharacterController) {}
}

container.resolve(Server);
