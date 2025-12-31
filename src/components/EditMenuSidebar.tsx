import { useEffect, useState } from "react";
import Dropdown from "./Dropdowns/Dropdown";
import ImageUploadZone from "./UploadZones/ImageUploadZone";
import SuccessDialog from "./SuccessPopup";
import { useForm } from "react-hook-form";
import { uploadImage } from "../utils/uploadImg";
import type { MenuList } from "../constants/MockOrdersData";
import { DishCategory } from "../constants/DishCategoryEnums";
import { customInputCss } from "../constants/CustomInputCss";

export type EditDishFormData = {
  dishImgUrl: string;
  name: string;
  category: string;
  price: string;
  description: string;
};

export type EditDishPayload = EditDishFormData;

interface EditMenuSidebarProps {
  onClose: () => void; // 이름만 살짝 변경
  menuToEdit: MenuList | null;
  handleUpdateDish: (data: EditDishFormData) => void;
}

const EditMenuSidebar: React.FC<EditMenuSidebarProps> = ({
  onClose,
  menuToEdit,
  handleUpdateDish,
}) => {
  const [newPreview, setNewPreview] = useState<string>(
    menuToEdit?.dishImgUrl ?? ""
  );
  const [categoryOption, setCategoryOption] = useState<string>(
    menuToEdit?.category ?? "Apetizers"
  );
  const [showSuccess, setShowSuccess] = useState(false);

  // 🔥 애니메이션용 로컬 상태
  const [closing, setClosing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EditDishFormData>({
    mode: "onSubmit",
    defaultValues: {
      dishImgUrl: menuToEdit?.dishImgUrl ?? "",
      name: menuToEdit?.name ?? "",
      category: menuToEdit?.category ?? "Apetizers",
      price: menuToEdit?.price ?? "",
      description: menuToEdit?.description ?? "",
    },
  });

  const onSelectImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setNewPreview(url);
    const persistentUrl = await uploadImage(file);
    setValue("dishImgUrl", persistentUrl);
  };

  useEffect(() => {
    setValue("category", categoryOption);
  }, [categoryOption, setValue]);

  const updateDishSubmit = (data: EditDishFormData) => {
    handleUpdateDish(data);
    setShowSuccess(true);
  };

  // 🔥 공통 닫기 핸들러 (슬라이드 아웃 후 언마운트)
  const handleClose = () => {
    setClosing(true); // 클래스를 translate-x-full로 바뀌게
    setTimeout(() => {
      onClose();
    }, 300); // duration-300 과 맞추기
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-500 ${
          closing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <section
        className={`
          fixed top-0 right-0 z-50 h-full w-200 bg-white p-6
          transform transition-transform duration-500
          ${closing ? "translate-x-full" : "translate-x-0"}
        `}
      >
        <h1 className="text-xl font-semibold">Edit Menu</h1>

        <form
          onSubmit={handleSubmit(updateDishSubmit)}
          className="mt-4 grid grid-cols-1 items-start gap-6 md:grid-cols-6"
        >
          {/* Left: photo */}
          <article className="md:col-span-2">
            <div className="mb-1 text-sm font-medium">Photo</div>
            <ImageUploadZone
              className="w-full"
              previewSrc={newPreview || undefined}
              onSelected={onSelectImageUpload}
            />
            <p className="mt-2 text-xs text-slate-500">
              Shown exactly as it will be cropped (square).
            </p>
          </article>

          {/* Right: inputs */}
          <article className="grid grid-cols-1 gap-4 md:col-span-4 md:grid-cols-4">
            <label className="md:col-span-4">
              <span className="text-sm font-medium">Item name</span>
              <input
                {...register("name", { required: "Name is required" })}
                className={customInputCss}
                placeholder="Kung Pao Chicken"
              />
              {errors?.name?.message && (
                <span className="text-xs text-rose-600">
                  {String(errors?.name?.message)}
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
                widthCss="w-full"
              />
            </label>

            <label className="md:col-span-2">
              <span className="text-sm font-medium">Price</span>
              <input
                {...register("price", { required: "Price is required" })}
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0.01"
                className={customInputCss}
                placeholder="12.00"
              />
              {errors?.price?.message && (
                <span className="text-xs text-rose-600">
                  {String(errors?.price?.message)}
                </span>
              )}
            </label>

            <label className="md:col-span-4">
              <span className="text-sm font-medium">Description</span>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={3}
                className={customInputCss}
                placeholder="Spicy stir-fry with peanuts, chili and scallions."
              />
              {errors?.description?.message && (
                <span className="text-xs text-rose-600">
                  {String(errors?.description?.message)}
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
          reset();
          setNewPreview("");
          handleClose();
        }}
      />
    </>
  );
};

export default EditMenuSidebar;
