import { IUserRepository } from "../../../Domain/repositories/users/IUserRepository";
import { User } from "../../../Domain/models/User";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../../connection/DbConnectionPool";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    try {
      const query = `
        INSERT INTO users (username, uloga, lozinka)
        VALUES (?, ?, ?)
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.username,
        user.uloga,
        user.lozinka, // lozinka je već hashirana iz AuthService
      ]);

      if (result.insertId) {
        return new User(result.insertId, user.username, user.uloga, user.lozinka);
      }

      return new User();
    } catch (error) {
      console.error("Error creating user:", error);
      return new User();
    }
  }

  async getById(user_id: number): Promise<User> {
    try {
      const query = `SELECT * FROM users WHERE user_id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [user_id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new User(row.user_id, row.username, row.uloga, row.lozinka);
      }

      return new User();
    } catch {
      return new User();
    }
  }

  async getByUsername(username: string): Promise<User> {
    try {
      const query = `
        SELECT user_id, username, uloga, lozinka
        FROM users
        WHERE username = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [username]);

      if (rows.length > 0) {
        const row = rows[0];
        return new User(row.user_id, row.username, row.uloga, row.lozinka);
      }

      return new User();
    } catch (error) {
      console.log("Error getting user by username:", error);
      return new User();
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const query = `SELECT * FROM users ORDER BY user_id ASC`;
      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) => new User(row.user_id, row.username, row.uloga, row.lozinka)
      );
    } catch {
      return [];
    }
  }

  async update(user: User): Promise<User> {
    try {
      const query = `
        UPDATE users
        SET username = ?, lozinka = ?
        WHERE user_id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.username,
        user.lozinka,
        user.user_id,
      ]);

      if (result.affectedRows > 0) {
        return user;
      }

      return new User();
    } catch {
      return new User();
    }
  }

  async delete(user_id: number): Promise<boolean> {
    try {
      const query = `DELETE FROM users WHERE user_id = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [user_id]);
      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async exists(user_id: number): Promise<boolean> {
    try {
      const query = `SELECT COUNT(*) as count FROM users WHERE user_id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [user_id]);
      return rows[0].count > 0;
    } catch {
      return false;
    }
  }
}
