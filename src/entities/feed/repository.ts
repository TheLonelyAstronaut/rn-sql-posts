import { Comment, CommentsRepository } from "../comment";
import { Thread } from "../thread";
import { Feed } from "./model";

type TreeNode = { node_id: string; children_count: 0 };

export class FeedRepository {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  getPaginatedFeed = async (
    pageSize: number,
    offset: number,
  ): Promise<Feed> => {
    const [comments, nodes] = (await Promise.all([
      this.commentsRepository.selectComments(pageSize, offset),
      this.commentsRepository.countTreeNodes(),
    ])) as unknown as [Array<Comment>, Array<TreeNode>];

    console.log(comments.map((c) => c.id));

    return new Feed({
      comments: comments,
      threadsCount: nodes.reduce(
        (map, n) => {
          map.set(n.node_id, n.children_count);

          if (n.node_id.indexOf(".") === -1) {
            map.set("root", map.get("root")! + 1);
          }

          return map;
        },
        new Map<string, number>([["root", 0]]),
      ),
    });
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
