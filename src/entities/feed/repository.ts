import { CommentsRepository } from "../comment";

export class FeedRepository {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  getPaginatedFeed = (pageNumber: number, pageSize: number) => {
    // 1. PageNumber === 0
    //    - Fetch/calulate threads and its sizes
    //    - Create first feed page with nested structure
    // 2. PageNumber !== 0
    //    - Get paginated data
    //    - Merge with existing feed via `Feed::copyWith`
  };
}
