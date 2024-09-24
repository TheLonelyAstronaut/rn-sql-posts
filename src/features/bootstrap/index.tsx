import { useCallback, useEffect, useState } from "react";
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
import { UsersRepository } from "@/entities/user";
import { CommentsRepository } from "@/entities/comment";

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

  const usersRepository = new UsersRepository(datastore);
  const commentsRepository = new CommentsRepository(datastore);

  splash.preventAutoHide();
  navigation.enablePerformanceTweaks(true);

  const diContext = { container: new Map() };

  diContext.container.set(NavigationService, navigation);
  diContext.container.set(SplashScreenService, splash);
  diContext.container.set(AnalyticsService, analyticsService);
  diContext.container.set(Logger, logger);
  diContext.container.set(CoreDatastore, datastore);
  diContext.container.set(UsersRepository, usersRepository);
  diContext.container.set(CommentsRepository, commentsRepository);

  return (props: T & JSX.IntrinsicAttributes) => {
    const [isReady, setReady] = useState(false);

    const init = useCallback(async () => {
      await sqlAdapter.init();
      await usersRepository.initDatastore();
      await commentsRepository.initDatastore();

      setReady(true);

      setTimeout(() => splash.hide(), 500);
    }, []);

    useEffect(() => {
      init().catch(alert);
    }, [init]);

    if (!isReady) return null;

    return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <DIProvider value={diContext}>
          <ThemeProvider>
            <I18nProvider>
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
