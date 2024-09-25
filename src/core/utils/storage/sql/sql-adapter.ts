import * as SQLite from "expo-sqlite";

export type SQLStatement = SQLite.SQLiteStatement;

export type SQLStorageAdapter = {
  performQuery<T>(query: string): Promise<T>;
  runQuery<T>(query: string): Promise<T>;
  prepareStatement(statement: string): Promise<SQLStatement>;
};
