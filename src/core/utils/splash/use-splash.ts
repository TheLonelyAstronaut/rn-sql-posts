import { useContainerInstance } from "../di";
import { SplashScreenService } from "./splash-screen-service";

export const useSplash = () => useContainerInstance(SplashScreenService);
