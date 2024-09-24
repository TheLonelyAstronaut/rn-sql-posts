import { Thread } from "../thread";

export class Feed {
  threads: Array<Thread>;

  get flattenSortedThread() {
    return [];
  }

  copyWith = (newPage: Feed): Feed => {};
}
