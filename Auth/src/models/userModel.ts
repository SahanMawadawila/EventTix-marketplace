import { pool } from "../config/db";
import bcrypt from "bcrypt";

export interface User {
  id: number;
  email: string;
  password: string;
}

export class UserModel {
  static async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const queryText = `INSERT INTO users(email, password) VALUES($1, $2) RETURNING *`;
    const values = [email, hashedPassword];
    const { rows } = await pool.query(queryText, values); //destructuring the rows array from the result of the query
    return rows[0]; //since we are returning only one row, we return the first element of the array
  }

  static async findUser(email: string): Promise<User | null> {
    const queryText = `SELECT * FROM users WHERE email=$1`;
    const values = [email];
    const { rows } = await pool.query(queryText, values);
    return rows[0] || null;
  }
}
