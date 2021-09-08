import { singleton } from 'tsyringe';

@singleton()
export class CharacterDB {
  async createCharacter(identifier: string, characterDto: any): Promise<void> {}

  async getCharacters(identifier: string) {}
}
