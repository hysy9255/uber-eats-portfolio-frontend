interface DeleteThisAddressPopupProps {
  closePopUp: () => void;
  handleDeleteAddress: () => void;
}

const DeleteThisAddressPopup: React.FC<DeleteThisAddressPopupProps> = ({
  closePopUp,
  handleDeleteAddress,
}) => {
  return (
    <div className="fixed inset-0 z-400 bg-black/50 flex items-center justify-center">
      <div className="z-500 mx-4 w-full max-w-md rounded-2xl bg-white p-5 ring-1 ring-black/10">
        <h2 className="text-lg font-semibold">Delete this address?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Are you sure you want to delete ? This action cannot be undone.
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={closePopUp}
            className="rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50 hover:cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDeleteAddress}
            className="rounded-full px-4 py-2 text-sm font-medium text-red-600 ring-1 ring-red-200 hover:bg-red-50 hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteThisAddressPopup;
