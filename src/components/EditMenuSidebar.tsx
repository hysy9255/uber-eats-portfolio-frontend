import { useEffect, useState } from "react";
import ImageUploadZone from "./UploadZones/ImageUploadZone";
import SuccessDialog from "./PopUps/SuccessPopup";
import { useForm } from "react-hook-form";
import { uploadImage } from "../utils/uploadImg";
import { DishCategory } from "../constants/DishCategoryEnums";
import { customInputCss } from "../constants/CustomInputCss";
import type { EditDishForm } from "../formDataTypes/dish/editDishForm.type";
import { useMenus } from "../ReactContext/ownerDashboardMenus/UseMenus";
import Dropdown from "./Dropdowns/Dropdown";

const EditMenuSidebar = () => {
  const { setEditMenuSidebarOpen, menuToEdit, handleUpdateDish } = useMenus();
  const [newPreview, setNewPreview] = useState<string | undefined>(
    menuToEdit?.dishImgUrl
  );
  const [categoryOption, setCategoryOption] = useState<string>(
    menuToEdit?.category ?? "Apetizers"
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [closing, setClosing] = useState(false);
  const methods = useForm<EditDishForm>({
    mode: "onSubmit",
  });

  useEffect(() => {
    methods.reset({
      ...menuToEdit,
    });
  }, [menuToEdit, methods]);

  const onSelectImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setNewPreview(url);
    const persistentUrl = await uploadImage(file);
    methods.setValue("dishImgUrl", persistentUrl);
  };

  useEffect(() => {
    methods.setValue("category", categoryOption);
  }, [categoryOption, methods]);

  const updateDishSubmit = async (data: EditDishForm) => {
    if (!menuToEdit?.dishId) {
      return;
    }
    await handleUpdateDish(menuToEdit?.dishId, data);
    setShowSuccess(true);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setEditMenuSidebarOpen(false);
    }, 300);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-400 bg-black/40 transition-opacity duration-500 ${
          closing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      <section
        className={`
          fixed top-0 right-0 z-500 h-full w-200 bg-white p-6
          transform transition-transform duration-500
          ${closing ? "translate-x-full" : "translate-x-0"}
        `}
      >
        <h1 className="text-xl font-semibold">Edit Menu</h1>

        <form
          onSubmit={methods.handleSubmit(updateDishSubmit)}
          className="mt-4 grid grid-cols-1 items-start gap-6 md:grid-cols-6"
        >
          <article className="md:col-span-2">
            <div className="mb-1 text-sm font-medium">Photo</div>
            <ImageUploadZone
              className="w-full aspect-square rounded-lg"
              previewSrc={newPreview}
              onSelected={onSelectImageUpload}
            />
            <p className="mt-2 text-xs text-slate-500">
              Shown exactly as it will be cropped (square).
            </p>
          </article>

          <article className="grid grid-cols-1 gap-4 md:col-span-4 md:grid-cols-4">
            <label className="md:col-span-4">
              <span className="text-sm font-medium">Item name</span>
              <input
                {...methods.register("name", {
                  required: "Name is required",
                })}
                className={customInputCss}
                placeholder="Kung Pao Chicken"
              />
              {methods.formState.errors?.name?.message && (
                <span className="text-xs text-rose-600">
                  {String(methods.formState.errors?.name?.message)}
                </span>
              )}
            </label>

            <label className="md:col-span-2">
              <span className="text-sm font-medium">Category</span>
              <Dropdown
                options={[
                  DishCategory.Appetizers,
                  DishCategory.Mains,
                  DishCategory.Desserts,
                  DishCategory.Drinks,
                ]}
                option={categoryOption}
                setOption={setCategoryOption}
                isEditing={true}
                isRegular={true}
              />
            </label>

            <label className="md:col-span-2">
              <span className="text-sm font-medium">Price</span>
              <input
                {...methods.register("price", {
                  required: "Price is required",
                })}
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0.01"
                className={customInputCss}
                placeholder="12.00"
              />
              {methods.formState.errors?.price?.message && (
                <span className="text-xs text-rose-600">
                  {String(methods.formState.errors?.price?.message)}
                </span>
              )}
            </label>

            <label className="md:col-span-4">
              <span className="text-sm font-medium">Description</span>
              <textarea
                {...methods.register("description", {
                  required: "Description is required",
                })}
                rows={3}
                className={customInputCss}
                placeholder="Spicy stir-fry with peanuts, chili and scallions."
              />
              {methods.formState.errors?.description?.message && (
                <span className="text-xs text-rose-600">
                  {String(methods.formState.errors?.description?.message)}
                </span>
              )}
            </label>

            <div className="md:col-span-4 flex justify-end gap-6">
              <button
                type="button"
                onClick={handleClose}
                className="w-30 rounded-md bg-white p-3 ring-1 ring-slate-300 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-30 rounded-md bg-green-600 p-3 text-white ring-1 ring-slate-300 hover:cursor-pointer hover:bg-green-700 active:bg-green-800"
              >
                Edit
              </button>
            </div>
          </article>
        </form>
      </section>

      <SuccessDialog
        open={showSuccess}
        title="Menu Edited"
        message="Menu was edited successfully. Close this dialog to see the changes."
        onConfirm={() => {
          setShowSuccess(false);
          methods.reset();
          setNewPreview("");
          handleClose();
        }}
      />
    </>
  );
};

export default EditMenuSidebar;
