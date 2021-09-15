import { singleton } from 'tsyringe';
import { pool } from '../database/db';
import { CharacterProps } from './character.interface';
import { ResultSetHeader } from 'mysql2';

@singleton()
export class CharacterDB {
  /**
   *
   * @param playerId
   * @param characterDto Data that has been sent from NUI
   * @return insertId The characterId
   */
  async createCharacter(playerId: number, characterDto: any): Promise<number> {
    const query = `INSERT INTO characters (name, playerid)
                   VALUES (?, ?)`;
    const [results] = await pool.query(query, [characterDto.name, playerId]);

    return (<ResultSetHeader>results).insertId;
  }

  async getCharacters(playerId: number): Promise<CharacterProps[]> {
    console.log('getting characters');
    const query = `SELECT id AS characterId, name, phone_number AS phoneNumber
                   FROM characters
                   WHERE playerid = ?`;
    const [results] = await pool.query(query, [playerId]);
    console.log('got characters');

    return <CharacterProps[]>results;
  }

  async getSelectedCharacter(playerId: number, character: CharacterProps): Promise<CharacterProps> {
    const query = `SELECT id AS characterId, name, phone_number AS phoneNumber
                   FROM characters
                   WHERE playerid = ?
                     AND id = ?`;

    const [results] = await pool.query(query, [playerId, character.id]);

    const result = <CharacterProps[]>results;
    return result[0];
  }
}
