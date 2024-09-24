import { Comment } from "../comment";

// Thread always have same ID as root comment of this thread
export class Thread {
  // Looks like %....grandParentId.parentId.id%
  readonly id: string;
  readonly threads?: Array<Thread>;
  readonly comments: Array<Comment>;

  private _rootComment: Comment;
  get rootComment() {
    return this._rootComment;
  }

  private contentCount: number;

  constructor({
    id,
    threads,
    comments,
    contentCount,
    rootComment,
  }: {
    id: string;
    threads?: Array<Thread>;
    comments?: Array<Comment>;
    contentCount: number;
    rootComment: Comment;
  }) {
    this.id = id;
    this.threads = threads ?? [];
    this.comments = comments ?? [];
    this.contentCount = contentCount;
    this._rootComment = rootComment;
  }

  nextItemId = () => {
    this.contentCount += 1;
    return `${this.id}.${this.contentCount}`;
  };

  tryInjectComment = (comment: Comment): Thread => {
    // Use nextItemId
    return this;
  };

  dangerous_mutatingInjectComment = (comment: Comment) => {
    if (comment.id === this.id) {
      this._rootComment = comment;
    } else {
      // Nested Comments
    }
  };

  static fromComment = (comment: Comment): Thread => {
    return new Thread({
      id: comment.id,
      contentCount: 0,
      rootComment: comment,
    });
  };
}
