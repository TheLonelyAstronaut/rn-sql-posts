import * as crypto from "expo-crypto";

export class CryptoService {
  static randomUUID = () => crypto.randomUUID();
}
