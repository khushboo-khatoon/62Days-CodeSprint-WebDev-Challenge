import { usePageLoader } from "../context/PageLoaderContext";

const PageLoader = () => {
  const { loading } = usePageLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-9999
                    bg-[#FAF8F5]
                    flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-[#1F3D2B]/20
                        border-t-[#1F3D2B]
                        rounded-full animate-spin" />
        <p className="text-sm text-gray-600 tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
