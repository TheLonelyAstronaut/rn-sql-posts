import { KvStorageAdapter } from "./kv/kv-adapter";
import { SQLStorageAdapter } from "./sql/sql-adapter";

export class DatastoreAdapter {
  constructor(
    private readonly sqlAdapter: SQLStorageAdapter,
    private readonly kvAdapter: KvStorageAdapter,
  ) {}

  performQuery = async <T>(query: string): Promise<T> => {
    return this.sqlAdapter.performQuery(query);
  };

  runQuery = async <T>(query: string): Promise<T> => {
    return this.sqlAdapter.runQuery(query);
  };

  getAll = async <T>(query: string): Promise<T> => {
    return this.sqlAdapter.getAll(query);
  };

  prepareStatement = async (statement: string) => {
    return this.sqlAdapter.prepareStatement(statement);
  };
}
