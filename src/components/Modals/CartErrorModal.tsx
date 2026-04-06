import { useEffect } from "react";
import { ErrorCircleIcon } from "../Icons/ErrorCircleIcon";

interface CartErrorModalProps {
  onClickCancel: () => void;
  onClickAddAnyway: () => void;
}

const CartErrorModal: React.FC<CartErrorModalProps> = ({
  onClickCancel,
  onClickAddAnyway,
}) => {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="z-300 fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="max-w-sm flex flex-col border border-slate-100 rounded-md bg-white">
        <div className="flex gap-3 p-4">
          <div className="">
            <ErrorCircleIcon className="w-10 h-10" />
          </div>
          <div className="">
            <div className="flex justify-between gap-3 ">
              <h3 className="text-base font-semibold text-slate-900">
                Different Restaurant
              </h3>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              You already have items from another restaurant in your cart. It
              will remove those items and add this dish instead.
            </p>
          </div>
        </div>
        <div className="border-t border-slate-100 flex gap-3 p-5">
          <button
            onClick={onClickAddAnyway}
            className="w-full border border-gray-300 bg-white shadow-md text-black font-medium rounded-md py-1 hover:cursor-pointer"
          >
            Add anyway
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

export default CartErrorModal;
