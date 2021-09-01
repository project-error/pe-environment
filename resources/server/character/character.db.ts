import { pool } from '../database/db';
import { ResultSetHeader } from 'mysql2';
import { Service } from 'typedi';

@Service()
export class _CharacterDB {
  async createCharacter(identifier: string, characterDto: any): Promise<void> {}

  async getCharacters(identifier: string) {}
}
