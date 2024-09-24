import { CoreDatastore, SQLStatement } from "@/core";
import { CREATE_USERS_TABLE } from "../user/queries";
import {
  COUNT_TREE_NODES,
  CREATE_COMMENT,
  CREATE_COMMENTS_TABLE,
  SELECT_COMMENTS,
} from "./queries";
import { Comment } from "./model";

export class CommentsRepository {
  private _countTreeNodes: SQLStatement = null!;
  private _createComment: SQLStatement = null!;
  private _selectComments: SQLStatement = null!;

  constructor(private readonly datastore: CoreDatastore) {}

  initDatastore = async () => {
    await this.datastore.performQuery(CREATE_COMMENTS_TABLE);

    [this._countTreeNodes, this._createComment, this._selectComments] =
      await Promise.all([
        this.datastore.prepareStatement(COUNT_TREE_NODES),
        this.datastore.prepareStatement(CREATE_COMMENT),
        this.datastore.prepareStatement(SELECT_COMMENTS),
      ]);
  };

  countTreeNodes = async () => {
    return this._countTreeNodes
      .executeAsync()
      .then((r) => r.getAllAsync())
      .catch(console.log);
  };

  createComment = async (comment: Comment) => {
    return this._createComment
      .executeAsync({
        $id: comment.id,
        $content: comment.content,
        $author_id: comment.author.id,
        $date: comment.date.getTime(),
      })
      .then((r) => r.getAllAsync());
  };

  selectComments = async (pageSize: number, pageNumber: number) => {
    return this._selectComments
      .executeAsync({ $limit: pageSize, $offset: pageNumber * pageSize })
      .then((r) => r.getAllAsync());
    //return [];
  };
}
