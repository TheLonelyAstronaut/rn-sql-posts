import { CoreDatastore, SQLStatement } from "@/core";
import {
  CREATE_USER,
  CREATE_USERS_TABLE,
  FIND_USER_WITH_DATA,
  GET_USER_BY_ID,
  VERIFY_USER,
} from "./queries";
import { User } from "./model";

export enum UserVerificationStatus {
  Verified,
  IncorrectPassword,
  DataAlreadyExists,
  NotExist,
}

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

  createUser = async (user: User) => {
    await this._createUser
      .executeAsync({
        $id: user.id,
        $email: user.email,
        $username: user.username,
        $password_hash: user.passwordHash ?? "",
        $avatar: user.avatar,
      })
      .then((r) => r.getAllAsync());

    return user.id;
  };

  verifyUser = async (
    user: User,
  ): Promise<UserVerificationStatus | User["id"]> => {
    const existingData = await this._findUserWithData
      .executeAsync({
        $username: user.username,
        $email: user.email,
      })
      .then((r) => r.getFirstAsync() as Partial<User>);

    if (
      !!existingData &&
      (existingData.email !== user.email ||
        existingData.username !== user.username)
    ) {
      return UserVerificationStatus.DataAlreadyExists;
    } else if (!existingData) {
      return UserVerificationStatus.NotExist;
    }

    const verifiedUser = await this._verifyUser
      .executeAsync({
        $username: user.username,
        $email: user.email,
        $password_hash: user.passwordHash ?? "",
      })
      .then((r) => r.getFirstAsync() as Partial<User>);

    return !!verifiedUser
      ? verifiedUser.id ?? ""
      : UserVerificationStatus.IncorrectPassword;
  };

  getUserById = async (id: string): Promise<User> => {
    return this._getUserById
      .executeAsync({
        $id: id,
      })
      .then(async (r) => {
        const data = await r.getFirstAsync();

        if (!data) throw new Error("No such user!");
        return new User(data as unknown as User);
      });
  };
}
