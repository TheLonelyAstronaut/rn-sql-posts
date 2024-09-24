import * as crypto from "expo-crypto";

export class CryptoService {
  static randomUUID = () => crypto.randomUUID();

  static encrypt = async (data: string) => {
    return crypto.digestStringAsync(crypto.CryptoDigestAlgorithm.SHA256, data);
  };
}
