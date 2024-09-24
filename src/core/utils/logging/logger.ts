import { OutputProvider } from "./output-providers/output-provider";

export class Logger {
  constructor(private readonly provider: OutputProvider) {}
}
