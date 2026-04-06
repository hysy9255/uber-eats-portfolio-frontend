interface AddressErrorPopUpProps {
  errorMessage?: unknown;
  closePopUp: () => void;
}

const AddressErrorPopUp: React.FC<AddressErrorPopUpProps> = ({
  errorMessage,
  closePopUp,
}) => {
  return (
    <div className="fixed inset-0 z-400 bg-black/50 flex items-center justify-center">
      <div className="z-500 mx-4 w-full max-w-md rounded-2xl bg-white p-5 ring-1 ring-black/10">
        <h2 className="text-lg font-semibold">Error Occurred</h2>
        <p className="mt-2 text-sm text-slate-600">{String(errorMessage)}</p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={closePopUp}
            className="rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressErrorPopUp;
