import { useEffect } from "react";
import { ErrorCircleIcon } from "../Icons/ErrorCircleIcon";

interface LogoutWarningModalProps {
  onClickCancel: () => void;
  onClickLogoutAnyway: () => void;
}

const LogoutWarningModal: React.FC<LogoutWarningModalProps> = ({
  onClickCancel,
  onClickLogoutAnyway,
}) => {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="z-[400] fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="max-w-sm flex flex-col border border-slate-100 rounded-md bg-white">
        <div className="flex gap-3 p-4">
          <div className="">
            <ErrorCircleIcon className="w-10 h-10" />
          </div>
          <div className="">
            <div className="flex justify-between gap-3 ">
              <h3 className="text-base font-semibold text-slate-900">
                Are you sure to logout?
              </h3>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Are you sure you want to log out? You will need to sign in again
              to access your account.
            </p>
          </div>
        </div>
        <div className="border-t border-slate-100 flex gap-3 p-5">
          <button
            onClick={onClickLogoutAnyway}
            className="w-full border border-gray-300 bg-white shadow-md text-black font-medium rounded-md py-1 hover:cursor-pointer"
          >
            Logout
          </button>
          <button
            onClick={onClickCancel}
            className="w-full border border-gray-700 bg-gray-700 shadow-md text-white font-medium rounded-md py-1 hover:cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutWarningModal;
