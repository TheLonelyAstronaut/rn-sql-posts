import { CryptoService } from "@/core";
import { User } from "../user";

export class Comment {
  readonly id: string;
  readonly author: User;
  readonly content: string;
  readonly date: Date;

  constructor({
    id,
    author,
    content,
    date,
  }: {
    id: string;
    author: User;
    content: string;
    date: Date;
  }) {
    this.id = id;
    this.author = author;
    this.content = content;
    this.date = date;
  }
}
