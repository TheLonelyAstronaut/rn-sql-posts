import { useContainerInstance } from "../di";
import { Logger } from "./logger";

export const useLogger = () => useContainerInstance(Logger);
