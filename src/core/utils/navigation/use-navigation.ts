import { useContainerInstance } from "../di";
import { NavigationService } from "./navigation-service";

export const useNavigation = () => useContainerInstance(NavigationService);
