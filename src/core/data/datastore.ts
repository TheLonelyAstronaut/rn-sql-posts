import { DatastoreAdapter } from "../utils";

export class CoreDatastore {
  constructor(private readonly adapter: DatastoreAdapter) {}

  performQuery = async <T>(query: string): Promise<T> => {
    return this.adapter.performQuery(query);
  };

  prepareStatement = async (statement: string) => {
    return this.adapter.prepareStatement(statement);
  };
}
