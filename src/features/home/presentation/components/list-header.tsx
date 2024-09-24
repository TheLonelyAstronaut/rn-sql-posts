import { DefaultSeparator } from "@/core";
import { AddComment, AddCommentProps } from "./add-comment";

export const ListHeader = (props: AddCommentProps) => (
  <>
    <AddComment {...props} />
    <DefaultSeparator />
  </>
);
