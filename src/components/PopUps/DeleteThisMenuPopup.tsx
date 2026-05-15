import { useMenus } from "../../ReactContext/ownerDashboardMenus/UseMenus";

const DeleteThisMenuPopup = () => {
  const {
    setMenuToDelete,
    menuToDelete,
    setShowConfirmDelete,
    handleDeleteDish,
  } = useMenus();
  if (!menuToDelete) return;

  const deleteDishSubmit = async (dishId: string) => {
    try {
      await handleDeleteDish(dishId);
      setShowConfirmDelete(false);
      setMenuToDelete(null);
    } catch (e) {
      console.error(e);
      alert("Server Error: Please try again");
    }
  };
  return (
    <div
      className="fixed inset-0 z-400 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 " />
      {/* panel */}
      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/10 ">
        <h2 className="text-lg font-semibold">Delete this menu?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-black">{menuToDelete.name}</span>?
          This action cannot be undone.
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setShowConfirmDelete(false)}
            className="rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => deleteDishSubmit(menuToDelete.dishId)}
            className="rounded-full px-4 py-2 text-sm font-medium text-red-600 ring-1 ring-red-200 hover:bg-red-50 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteThisMenuPopup;
