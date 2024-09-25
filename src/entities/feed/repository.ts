import { Comment, CommentsRepository } from "../comment";
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
