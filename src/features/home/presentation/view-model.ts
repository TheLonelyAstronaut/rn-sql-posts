import { useContainerInstance } from "@/core";
import { Comment } from "@/entities/comment";
import { Feed } from "@/entities/feed";
import { FeedRepository } from "@/entities/feed/repository";
import { User } from "@/entities/user";
import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_SIZE = 25;

export const useHomeScreenViewModel = () => {
  const [isLoading, setLoading] = useState(true);
  const repo = useContainerInstance(FeedRepository);

  const [feed, _setFeed] = useState(new Feed({}));
  const _shadowFeed = useRef(feed);
  const setFeed = useCallback((feed: Feed) => {
    _setFeed(feed);
    _shadowFeed.current = feed;
  }, []);

  const pageNumber = useRef(0);

  useEffect(() => {
    setLoading(true);

    repo
      .getPaginatedFeed(0, PAGE_SIZE)
      .then(setFeed)
      .finally(() => setLoading(false));
  }, []);

  const handleAddTopThread = useCallback(async (text: string, user: User) => {
    const comment = new Comment({
      id: _shadowFeed.current.nextThreadId(),
      author: user,
      content: text,
      date: new Date(),
    });

    try {
      await repo.addComment(comment);
      setFeed(_shadowFeed.current.addComment(comment, true));
    } catch (e) {
      alert(e);
    }
  }, []);

  return {
    isLoading,
    handleAddTopThread,
    feed,
  };
};
