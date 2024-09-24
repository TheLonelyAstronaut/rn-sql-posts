import { DatastoreAdapter } from "../utils";

export class CoreDatastore {
  constructor(private readonly adapter: DatastoreAdapter) {}

  performQuery = async <T>(query: string): Promise<T> => {
    return this.adapter.performQuery(query);
  };

  getAll = async <T>(query: string): Promise<T> => {
    return this.adapter.getAll(query);
  };

  prepareStatement = async (statement: string) => {
    return this.adapter.prepareStatement(statement);
  };
}
