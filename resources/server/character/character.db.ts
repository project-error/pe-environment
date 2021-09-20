import { singleton } from 'tsyringe';
import { pool } from '../database/db';
import { CharacterProps } from '../../shared/types/character';
import { ResultSetHeader } from 'mysql2';

@singleton()
export class CharacterDB {
  /**
   *
   * @param playerId
   * @param characterDto Data that has been sent from NUI
   * @return insertId The characterId
   */
  async createCharacter(playerId: number, characterDto: CharacterProps): Promise<number> {
    const query = `INSERT INTO characters (name, playerid)
                   VALUES (?, ?)`;
    const [results] = await pool.query(query, [characterDto.name, playerId]);

    return (<ResultSetHeader>results).insertId;
  }

  async getCharacters(playerId: number): Promise<CharacterProps[]> {
    const query = `SELECT id AS characterId, name, phone_number AS phoneNumber
                   FROM characters
                   WHERE playerid = ?`;
    const [results] = await pool.query(query, [playerId]);

    return <CharacterProps[]>results;
  }

  async getSelectedCharacter(playerId: number, characterId: number): Promise<CharacterProps> {
    const query = `SELECT id AS characterId, name, phone_number AS phoneNumber
                   FROM characters
                   WHERE playerid = ?
                     AND id = ?`;

    const [results] = await pool.query(query, [playerId, characterId]);

    const result = <CharacterProps[]>results;
    return result[0];
  }
}
