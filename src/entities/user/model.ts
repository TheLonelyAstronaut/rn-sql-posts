import { CryptoService } from "@/core";

export class User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly passwordHash?: string;
  readonly avatar: string;

  constructor({
    id,
    username,
    email,
    passwordHash,
    avatar,
  }: {
    id?: string;
    username: string;
    email?: string;
    passwordHash?: string;
    avatar: string;
  }) {
    this.id = id ?? CryptoService.randomUUID();
    this.username = username;
    this.email = email ?? "";
    this.passwordHash = passwordHash;
    this.avatar = avatar;
  }
}
