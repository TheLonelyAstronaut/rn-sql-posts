import { useContainerInstance } from "@/core";
import { Comment } from "@/entities/comment";
import { Feed } from "@/entities/feed";
import { FeedRepository } from "@/entities/feed/repository";
import { User } from "@/entities/user";
import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_SIZE = 25;

export const useHomeScreenViewModel = () => {
  const [isLoading, setLoading] = useState(false);
  const repo = useContainerInstance(FeedRepository);

  const [feed, _setFeed] = useState(Feed.empty);
  const _shadowFeed = useRef(feed);
  const setFeed = useCallback((feed: Feed) => {
    _setFeed(feed);
    _shadowFeed.current = feed;
  }, []);

  const hasNextPage = useRef(true);

  const loadNextPage = useCallback(() => {
    if (!hasNextPage.current) return;

    console.log("NEXT PAGE");

    repo
      .getPaginatedFeed(PAGE_SIZE, _shadowFeed.current.comments.length)
      .then((r) => {
        if (r.comments.length < PAGE_SIZE) hasNextPage.current = false;

        setFeed(_shadowFeed.current.merge(r));
      });
  }, [setFeed]);

  const handleAddComment = useCallback(
    async (text: string, user: User, parent = "root") => {
      const comment = new Comment({
        id: _shadowFeed.current.nextCommentId(parent),
        author: user,
        content: text,
        date: new Date(),
      });

      try {
        await repo.addComment(comment);
        setFeed(_shadowFeed.current.addComment(comment));
      } catch (e) {
        _shadowFeed.current.revertCommentId(comment.id, parent);
        alert(e);
      }
    },
    [],
  );

  return {
    isLoading,
    handleAddComment,
    feed,
    shallowFeed: _shadowFeed,
    loadNextPage,
  };
};
