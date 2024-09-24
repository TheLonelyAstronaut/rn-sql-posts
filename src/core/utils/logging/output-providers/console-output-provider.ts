import { OutputProvider } from "./output-provider";

export class ConsoleOutputProvider implements OutputProvider {
  log = (...data: any[]) => {};
}
