import { CryptoService } from "@/core";
import { User } from "../user";

export class Comment {
  readonly id: string;
  readonly threadId: string;
  readonly postId: string;
  readonly author: User;
  readonly content: string;
  readonly date: Date;

  constructor({
    id,
    threadId,
    postId,
    author,
    content,
    date,
  }: {
    id?: string;
    threadId: string;
    author: User;
    postId: string;
    content: string;
    date: Date;
  }) {
    this.id = id ?? CryptoService.randomUUID();
    this.threadId = threadId;
    this.postId = postId;
    this.author = author;
    this.content = content;
    this.date = date;
  }
}
