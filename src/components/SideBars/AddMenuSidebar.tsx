import { useForm } from "react-hook-form";
import ImageUploadZone from "../UploadZones/ImageUploadZone";
import { useEffect, useState } from "react";
import { uploadImage } from "../../utils/uploadImg";
import SuccessDialog from "../PopUps/SuccessPopup";
import { DishCategory } from "../../constants/DishCategoryEnums";
import { customInputCss } from "../../constants/CustomInputCss";
import { useMenus } from "../../ReactContext/ownerDashboardMenus/UseMenus";
import type { CreateDishForm } from "../../formDataTypes/dish/createDishForm.type";
import Dropdown from "../Dropdowns/Dropdown";

const AddMenuSidebar = () => {
  const { setAddMenuSidebarOpen, handleCreateDish } = useMenus();
  const [newPreview, setNewPreview] = useState<string>();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [categoryOption, setCategoryOption] = useState<string>("Appetizers");

  const methods = useForm<CreateDishForm>({
    mode: "onSubmit",
  });

  useEffect(() => {
    methods.setValue("category", categoryOption);
  }, [categoryOption, methods]);

  const onSelectImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setNewPreview(url);
    const persistentUrl = await uploadImage(file);
    methods.setValue("dishImgUrl", persistentUrl);
  };

  const createDishSubmit = (data: CreateDishForm) => {
    handleCreateDish(data);
    setShowSuccess(true);
  };

  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setAddMenuSidebarOpen(false);
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
          fixed z-500 top-0 right-0 h-full w-200 bg-white p-6
          transform transition-transform duration-500
          ${closing ? "translate-x-full" : "translate-x-0"}
        `}
      >
        <h1 className="text-xl font-semibold">Add Menu</h1>

        <form
          onSubmit={methods.handleSubmit(createDishSubmit)}
          className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-6 items-start"
        >
          <article className="md:col-span-2">
            <div className="text-sm font-medium mb-1">Photo</div>
            <ImageUploadZone
              className="w-full aspect-square rounded-lg"
              previewSrc={newPreview}
              onSelected={onSelectImageUpload}
            />
            <p className="mt-2 text-xs text-slate-500">
              Shown exactly as it will be cropped (square).
            </p>
          </article>

          <article className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-2">
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
                className="ring-1 ring-slate-300 w-30 p-3 bg-white rounded-md hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200"
              >
                Close
              </button>
              <button
                type="submit"
                className="ring-1 ring-slate-300 w-30 p-3 bg-green-600 text-white rounded-md hover:cursor-pointer hover:bg-green-700 active:bg-green-800"
              >
                Create
              </button>
            </div>
          </article>
        </form>
      </section>
      <SuccessDialog
        open={showSuccess}
        title="Menu Created"
        message="New menu was created successfully. Continue to add more or close this dialog."
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

export default AddMenuSidebar;
