import { CheckCircle, XCircle } from "lucide-react";

const Toast = ({ message, type = "success" }) => {
  const isSuccess = type === "success";

  return (
    <div
      className={`
        flex items-start gap-3 min-w-65 max-w-sm
        rounded-xl px-4 py-3
        backdrop-blur-md bg-white/90
        shadow-[0_10px_30px_rgba(0,0,0,0.12)]
        border-l-4
        animate-toast-in
        ${isSuccess ? "border-[#2F6B4F]" : "border-red-500"}
      `}
    >

      <div className="mt-0.5">
        {isSuccess ? (
          <CheckCircle className="text-[#2F6B4F]" size={22} />
        ) : (
          <XCircle className="text-red-500" size={22} />
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">
          {isSuccess ? "Success" : "Error"}
        </p>
        <p className="text-sm text-gray-600 leading-snug">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Toast;
