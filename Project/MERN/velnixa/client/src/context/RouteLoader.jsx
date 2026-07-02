import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePageLoader } from "../context/PageLoaderContext";

const RouteLoader = () => {
  const { pathname } = useLocation();
  const { setLoading } = usePageLoader();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname, setLoading]);

  return null;
};

export default RouteLoader;
