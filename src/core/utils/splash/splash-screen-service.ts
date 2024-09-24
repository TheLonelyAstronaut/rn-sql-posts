import * as SplashScreen from "expo-splash-screen";

export class SplashScreenService {
  hide = async () => {
    SplashScreen.hideAsync();
  };

  preventAutoHide = async () => {
    SplashScreen.preventAutoHideAsync();
  };
}
