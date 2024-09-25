import { Comment } from "../comment";

export class Feed {
  readonly comments: Array<Comment>;
  private threadsCount: Map<string, number>;

  static readonly empty = new Feed({ comments: [], threadsCount: new Map() });

  constructor({
    comments,
    threadsCount,
  }: {
    comments: Array<Comment>;
    threadsCount: Map<string, number>;
  }) {
    this.comments = comments;

    console.log(threadsCount);

    this.threadsCount = threadsCount;
  }

  nextCommentId = (parent = "root") => {
    const num = this.threadsCount.get(parent)! + 1;

    if (parent === "root") return num.toString();
    else {
      this.threadsCount.set(parent, num);
      return parent + "." + num;
    }
  };

  addComment = (comment: Comment, topLevel?: true): Feed => {
    const newCount = new Map(this.threadsCount);

    if (topLevel) {
      newCount.set("root", (newCount.get("root") ?? 0) + 1);
      newCount.set(comment.id, 0);
    }

    return new Feed({
      comments: topLevel
        ? [comment, ...this.comments]
        : // Later inject into correct position
          this.comments,
      threadsCount: newCount,
    });
  };

  //merge = (feed: Feed): Feed => {};
}
