import { createContext, useContext, useState } from "react";

const PageLoaderContext = createContext();

export const PageLoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <PageLoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </PageLoaderContext.Provider>
  );
};

export const usePageLoader = () => useContext(PageLoaderContext);
