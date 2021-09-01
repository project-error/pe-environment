import { pool } from '../database/db';
import { ResultSetHeader } from 'mysql2';
import { PlayerDatabaseProps } from './player.interface';
import { Service } from 'typedi';

@Service()
export class _PlayerDB implements PlayerDatabaseProps {
  async createPlayer(identifier: string, username: string): Promise<number> {
    const query = `INSERT INTO player (identifier, username)
                   VALUES (?, ?)`;
    const [results] = await pool.query(query, [identifier, username]);

    return (<ResultSetHeader>results).insertId;
  }
}
