import { CoreDatastore, SQLStatement } from "@/core";
import { CREATE_USERS_TABLE } from "../user/queries";
import {
  ADD_LEVEL_COLUMN,
  COUNT_TREE_NODES,
  CREATE_COMMENT,
  CREATE_COMMENTS_TABLE,
  SELECT_COMMENTS,
  TABLE_METADATA,
} from "./queries";
import { Comment } from "./model";
import { User } from "../user";

type JoinedComment = Omit<Comment, "author"> &
  Omit<User, "id"> & { user_id: string };

export class CommentsRepository {
  private _countTreeNodes: SQLStatement = null!;
  private _createComment: SQLStatement = null!;
  private _selectComments: SQLStatement = null!;
  private _levelAmount = 0;

  constructor(private readonly datastore: CoreDatastore) {}

  initDatastore = async () => {
    await this.datastore.performQuery(CREATE_COMMENTS_TABLE);

    [this._countTreeNodes, this._levelAmount] = await Promise.all([
      this.datastore.prepareStatement(COUNT_TREE_NODES),
      this.datastore
        .prepareStatement(TABLE_METADATA)
        .then((r) => r.executeAsync())
        .then((r) => r.getAllAsync() as Promise<Array<{ name: string }>>)
        .then((r) => r.filter((n) => n.name.includes("level_")).length),
    ]);

    await this.prepareStatementsWithLevelAmount();
  };

  private prepareStatementsWithLevelAmount = async () => {
    [this._createComment, this._selectComments] = await Promise.all([
      this.datastore.prepareStatement(modifyCreateStatement(this._levelAmount)),
      this.datastore.prepareStatement(modifySelectStatement(this._levelAmount)),
    ]);
  };

  countTreeNodes = async () => {
    return this._countTreeNodes
      .executeAsync()
      .then((r) => r.getAllAsync())
      .catch(console.log);
  };

  createComment = async (comment: Comment) => {
    let levels: Record<string, number> = {};

    comment.id
      .split(".")
      .map((s) => Number.parseInt(s))
      .forEach((l, i) => {
        levels[`$level_${i + 1}`] = l;
      });

    if (Object.keys(levels).length > this._levelAmount) {
      this._levelAmount = Object.keys(levels).length;
      await this.datastore.performQuery(modifyAddStatement(this._levelAmount));
      await this.prepareStatementsWithLevelAmount();
    }

    return this._createComment
      .executeAsync({
        $id: comment.id,
        $content: comment.content,
        $author_id: comment.author.id,
        $date: comment.date.getTime(),
        ...levels,
      })
      .then((r) => r.getAllAsync());
  };

  selectComments = async (
    pageSize: number,
    offset: number,
  ): Promise<Array<Comment>> => {
    return this._selectComments
      .executeAsync({ $limit: pageSize, $offset: offset })
      .then((r) => r.getAllAsync() as Promise<Array<JoinedComment>>)
      .then((d) =>
        d.map(
          (merged) =>
            new Comment({
              ...merged,
              author: new User({
                ...merged,
                id: merged.user_id,
              }),
            }),
        ),
      );
    //return [];
  };
}

const modifyCreateStatement = (amount: number): string => {
  let statement = CREATE_COMMENT;

  let toInsert = Array.from({ length: amount }, (_, i) => i + 1)
    .map((i) => ` level_${i}`)
    .join(",");

  statement = statement.replace("%", toInsert);

  toInsert = Array.from({ length: amount }, (_, i) => i + 1)
    .map((i) => ` $level_${i}`)
    .join(",");

  statement = statement.replace("#", toInsert);

  return statement;
};

const modifySelectStatement = (amount: number): string => {
  let statement = SELECT_COMMENTS;

  const toInsert = Array.from({ length: amount }, (_, i) => i + 1)
    .map((i) => `c.level_${i} IS NOT NULL, c.level_${i} DESC`)
    .join(",");

  statement = statement.replace("%", toInsert);

  return statement;
};

const modifyAddStatement = (amount: number): string => {
  let statement = ADD_LEVEL_COLUMN;

  return statement.replace("%", amount.toString());
};
