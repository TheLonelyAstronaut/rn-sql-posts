import { useEffect } from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { SessionProvider } from "../auth";
import {
  AnalyticsService,
  ConsoleAnalyticsProvider,
  ConsoleOutputProvider,
  DIProvider,
  I18nProvider,
  Logger,
  NavigationService,
  SplashScreenService,
  SecureKvStorage,
  SQLiteAdapter,
  DatastoreAdapter,
  CoreDatastore,
  ThemeProvider,
  AppThemes,
  AppLanguages,
} from "@/core";

export const withAppBootstrap = <T,>(Component: React.ComponentType<T>) => {
  const navigation = new NavigationService();
  const splash = new SplashScreenService();

  const analyticsProvider = new ConsoleAnalyticsProvider();
  const analyticsService = new AnalyticsService(analyticsProvider);

  const outputProvider = new ConsoleOutputProvider();
  const logger = new Logger(outputProvider);

  const kvAdapter = new SecureKvStorage();
  const sqlAdapter = new SQLiteAdapter();
  const datastoreAdapter = new DatastoreAdapter(sqlAdapter, kvAdapter);
  const datastore = new CoreDatastore(datastoreAdapter);

  splash.preventAutoHide();
  navigation.enablePerformanceTweaks(true);

  const diContext = { container: new Map() };
  const themeContext = { currentTheme: AppThemes.LIGHT };
  const i18nContext = { currentLocale: AppLanguages.EN };

  diContext.container.set(NavigationService, navigation);
  diContext.container.set(SplashScreenService, splash);
  diContext.container.set(AnalyticsService, analyticsService);
  diContext.container.set(Logger, logger);
  diContext.container.set(CoreDatastore, datastore);

  return (props: T & JSX.IntrinsicAttributes) => {
    useEffect(() => {
      // Simulating network request, background auth and other things
      setTimeout(() => splash.hide(), 500);
    }, []);

    return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <DIProvider value={diContext}>
          <ThemeProvider value={themeContext}>
            <I18nProvider value={i18nContext}>
              <SessionProvider>
                <Component {...props} />
              </SessionProvider>
            </I18nProvider>
          </ThemeProvider>
        </DIProvider>
      </SafeAreaProvider>
    );
  };
};
