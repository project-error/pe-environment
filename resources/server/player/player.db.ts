import { pool } from '../database/db';
import { ResultSetHeader } from 'mysql2';
import { singleton } from 'tsyringe';

@singleton()
export class PlayerDB {
  async createPlayer(identifier: string, username: string): Promise<number> {
    const query = `INSERT INTO user (identifier, username)
                   VALUES (?, ?)`;
    const [results] = await pool.query(query, [identifier, username]);

    return (<ResultSetHeader>results).insertId;
  }

  async getPlayer(identifier: string): Promise<{ id: number; username: string }> {
    const query = `SELECT id, username FROM user WHERE identifier = ?`;

    const [results] = await pool.query(query, [identifier]);

    const result = <{ id: number; username: string }[]>results;
    return result[0];
  }
}
