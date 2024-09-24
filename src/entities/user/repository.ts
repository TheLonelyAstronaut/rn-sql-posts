import { CoreDatastore, SQLStatement } from "@/core";
import {
  CREATE_USER,
  CREATE_USERS_TABLE,
  FIND_USER_WITH_DATA,
  GET_USER_BY_ID,
  VERIFY_USER,
} from "./queries";
import { User } from "./model";

export class UsersRepository {
  private _createUser: SQLStatement = null!;
  private _verifyUser: SQLStatement = null!;
  private _getUserById: SQLStatement = null!;
  private _findUserWithData: SQLStatement = null!;

  constructor(private readonly datastore: CoreDatastore) {}

  initDatastore = async () => {
    await this.datastore.performQuery(CREATE_USERS_TABLE);

    [
      this._createUser,
      this._verifyUser,
      this._getUserById,
      this._findUserWithData,
    ] = await Promise.all([
      this.datastore.prepareStatement(CREATE_USER),
      this.datastore.prepareStatement(VERIFY_USER),
      this.datastore.prepareStatement(GET_USER_BY_ID),
      this.datastore.prepareStatement(FIND_USER_WITH_DATA),
    ]);
  };

  createUser = (user: User) => {};

  verifyUser = (user: User) => {};

  getUserById = (id: string) => {};
}
