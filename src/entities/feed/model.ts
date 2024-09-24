import { Comment } from "../comment";
import { Thread } from "../thread";

export class Feed {
  // All threads declaration, could be empty cause of pagination
  readonly threads: Array<Thread>;

  constructor({ threads }: { threads?: Array<Thread> }) {
    this.threads = threads ?? [];
  }

  get flattenSortedThreads(): Array<Comment> {
    return [];
  }

  nextThreadId = () => {
    return (this.threads.length + 1).toString();
  };

  addComment = (comment: Comment, topLevel?: true): Feed => {
    return new Feed({
      threads: topLevel
        ? [Thread.fromComment(comment), ...this.threads]
        : this.threads.map((t) => t.tryInjectComment(comment)),
    });
  };

  merge = (feed: Feed): Feed => {};
}
