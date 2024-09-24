import { SQLStatement, SQLStorageAdapter } from "./sql-adapter";
import * as SQLite from "expo-sqlite";

export class SQLiteAdapter implements SQLStorageAdapter {
  private db: SQLite.SQLiteDatabase = null!;

  init = async () => {
    this.db = await SQLite.openDatabaseAsync("rn-shopy");
  };

  async performQuery<T>(query: string): Promise<T> {
    return this.db.execAsync(query);
  }

  async getAll<T>(query: string): Promise<T> {
    return this.db.getAllAsync(query);
  }

  prepareStatement(statement: string): Promise<SQLStatement> {
    return this.db.prepareAsync(statement);
  }
}
