import { useCallback } from "react";
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
    this.threadsCount = threadsCount;
  }

  nextCommentId = (parent = "root") => {
    const num = this.threadsCount.get(parent)! + 1;

    this.threadsCount.set(parent, num);

    if (parent === "root") {
      return num.toString();
    } else {
      return parent + "." + num;
    }
  };

  revertCommentId = (generatedId: string, parent = "root") => {
    const num = this.threadsCount.get(parent)! - 1;
    this.threadsCount.delete(generatedId);
    this.threadsCount.set(parent, num);
  };

  addComment = (comment: Comment): Feed => {
    const newCount = new Map(this.threadsCount);
    const topLevel = comment.id.indexOf(".") === -1;

    newCount.set(comment.id, 0);

    return new Feed({
      comments: topLevel
        ? [comment, ...this.comments]
        : tryInjectIntoArray(this.comments, comment),
      threadsCount: newCount,
    });
  };

  merge = (feed: Feed): Feed => {
    return new Feed({
      comments: [...this.comments, ...feed.comments],
      threadsCount: feed.threadsCount,
    });
  };
}

const tryInjectIntoArray = (prev: Array<Comment>, comment: Comment) => {
  const data = [...prev];
  const parentId = comment.id.substring(0, comment.id.lastIndexOf("."))!;

  data.splice(data.findIndex((c) => c.id === parentId) + 1, 0, comment);

  return data;
};
