import { Comment, CommentsRepository } from "../comment";
import { Thread } from "../thread";
import { Feed } from "./model";

type TreeNode = { node_id: string; children_count: 0 };

export class FeedRepository {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  // 1. PageNumber === 0
  //    - Fetch/calulate threads and its sizes
  //    - Create first feed page with nested structure
  // 2. PageNumber !== 0
  //    - Get paginated data
  //    - Merge with existing feed via `Feed::copyWith` outside repo
  getPaginatedFeed = async (
    pageNumber: number,
    pageSize: number,
  ): Promise<Feed> => {
    if (pageNumber === 0) {
      const [comments, nodes] = (await Promise.all([
        this.commentsRepository.selectComments(pageSize, pageNumber),
        this.commentsRepository.countTreeNodes(),
      ])) as unknown as [Array<Comment>, Array<TreeNode>];

      const threads = Object.values(buildThreesWithNodes(nodes));

      return new Feed({
        threads: fillThreadsWithComments(threads, comments).reverse(),
      });
    } else {
      return new Feed({});
    }
  };

  addComment = async (comment: Comment) => {
    return this.commentsRepository.createComment(comment);
  };
}

// Returning KV (Root thread ID - subthreaads)
const buildThreesWithNodes = (
  nodes: Array<TreeNode>,
): Record<Thread["id"], Thread> => {
  const rootTrees: Record<Thread["id"], Thread> = {};

  nodes.forEach((node) => {
    // Root node
    if (!node.node_id.includes(".")) {
      rootTrees[node.node_id] = new Thread({
        id: node.node_id,
        comments: [],
        rootComment: null!,
        contentCount: node.children_count,
      });
    } else {
      // Nested creation
    }
  });

  return rootTrees;
};

const fillThreadsWithComments = (
  threads: Array<Thread>,
  comments: Array<Comment>,
): Array<Thread> => {
  comments.forEach((c) => {
    // Iteerating over root threads
    threads
      .find((t) => t.id === c.id.split(".")[0])!
      .dangerous_mutatingInjectComment(c);
  });

  return threads;
};
