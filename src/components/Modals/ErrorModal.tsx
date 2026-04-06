import { useEffect } from "react";
import RoundBorderXMarkButton from "../Buttons/IconBased/RoundBorderXMarkButton/RoundBorderXMarkButton";

interface ErrorModalProps {
  onClickClose: () => void;
  errorMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  onClickClose,
  errorMessage,
}) => {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        <RoundBorderXMarkButton
          onClick={onClickClose}
          className="absolute top-4 right-4 border-slate-200 bg-white hover:bg-slate-50"
        />

        <div className="flex flex-col items-center px-6 py-8 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <span className="text-xl font-bold text-red-500">!</span>
          </div>

          <h2 className="text-lg font-semibold text-slate-900">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 break-words">
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={onClickClose}
            className="mt-6 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 hover:cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
