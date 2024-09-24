export class Thread {
  // Looks like %postId_threadNumber%
  readonly id: string;
  readonly threads?: Array<Thread>;
  readonly comments: Array<Comment>;

  private contentCount: number;

  constructor({
    id,
    threads,
    comments,
    contentCount,
  }: {
    id: string;
    threads?: Array<Thread>;
    comments: Array<Comment>;
    contentCount: number;
  }) {
    this.id = id;
    this.threads = threads;
    this.comments = comments;
    this.contentCount = contentCount;
  }

  // Common for nested threads and comments
  nextItemId = () => {
    this.contentCount += 1;
    return `${this.id}.${this.contentCount}`;
  };
}
