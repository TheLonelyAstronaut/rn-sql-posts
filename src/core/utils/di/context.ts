import React, { useContext, useMemo } from "react";

type Newable<K> = { new (...args: any[]): K };
type DIContainer<K = unknown> = Map<Newable<K>, K>;

const DIContext = React.createContext<{ container: DIContainer }>({
  container: new Map(),
});

export const useContainerInstance = <T>(clazz: Newable<T>): T => {
  const { container } = useContext(DIContext);
  return useMemo(() => container.get(clazz) as T, [container]);
};

export const DIProvider = DIContext.Provider;
