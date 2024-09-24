import { Href, router } from "expo-router";
import { enableFreeze, enableScreens } from "react-native-screens";

export class NavigationService {
  replace = (...params: Parameters<typeof router.replace>) => {
    router.replace(...params);
  };

  push = (...params: Parameters<typeof router.push>) => {
    router.push(...params);
  };

  enablePerformanceTweaks = (enable: boolean) => {
    enableScreens(enable);
    enableFreeze(enable);
  };
}
