import { KvStorageAdapter } from "./kv/kv-adapter";
import { SQLStorageAdapter } from "./sql/sql-adapter";

export class DatastoreAdapter {
  constructor(
    private readonly sqlAdapter: SQLStorageAdapter,
    private readonly kvAdapter: KvStorageAdapter,
  ) {}
}
