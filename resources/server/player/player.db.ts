import { pool } from '../database/db';
import { ResultSetHeader } from 'mysql2';
import { singleton } from 'tsyringe';

@singleton()
export class PlayerDB {
  async createPlayer(identifier: string, username: string): Promise<number> {
    const query = `INSERT INTO player (identifier, username)
                   VALUES (?, ?)`;
    const [results] = await pool.query(query, [identifier, username]);

    return (<ResultSetHeader>results).insertId;
  }

  async getPlayer(identifier: string): Promise<any> {
    const query = `SELECT id, username FROM player WHERE identifier = ?`;

    const [results] = await pool.query(query, [identifier]);

    const result = <any[]>results;
    return result[0];
  }
}
