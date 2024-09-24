import { CryptoService } from "@/core";

const mockedAvatars = [
  "https://api.dicebear.com/9.x/adventurer/png?seed=Luis",
  "https://api.dicebear.com/9.x/adventurer/png?seed=Kate",
  "https://api.dicebear.com/9.x/adventurer/png?seed=Vadzim",
];

export class User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  private _passwordHash?: string;
  get passwordHash() {
    return this._passwordHash;
  }
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
    avatar?: string;
  }) {
    this.id = id ?? CryptoService.randomUUID();
    this.username = username;
    this.email = email ?? "";
    this._passwordHash = passwordHash;
    this.avatar =
      avatar ?? mockedAvatars[Math.floor(Math.random() * mockedAvatars.length)];
  }

  flushPassword = () => (this._passwordHash = undefined);
}
