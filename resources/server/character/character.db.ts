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
    const query = `INSERT INTO character (name, playerid)
                   VALUES (?, ?)`;
    const [results] = await pool.query(query, [characterDto.name, playerId]);

    return (<ResultSetHeader>results).insertId;
  }

  async getCharacters(playerId: string): Promise<CharacterProps[]> {
    const query = `SELECT id AS characterId, name, phone_number AS phoneNumber
                   FROM character
                   WHERE playerid = ?`;
    const [results] = await pool.query(query, [playerId]);

    return <CharacterProps[]>results;
  }
}
