import { useForm } from "react-hook-form";
import ImageUploadZone from "./ImageUploadZone";
import { useEffect, useState } from "react";
import { uploadImage } from "../utils/uploadImg";
import Dropdown from "./Dropdown";
import SuccessDialog from "./SuccessPopup";

export type CreateDishFormData = {
  dishImgUrl: string;
  name: string;
  category: string;
  price: string;
  description: string;
};

export type CreateDishPayload = {
  items: CreateDishFormData[];
};

interface AddMenuSidebarProps {
  closeSideBar: () => void;
  handleCreateDish: (data: CreateDishFormData) => void;
}

const AddMenuSidebar: React.FC<AddMenuSidebarProps> = ({
  closeSideBar,
  handleCreateDish,
}) => {
  const [newPreview, setNewPreview] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [categoryOption, setCategoryOption] = useState<string>("Apetizers");
  const { register, handleSubmit, setValue, reset } =
    useForm<CreateDishFormData>({
      mode: "onSubmit",
      defaultValues: {
        dishImgUrl: "",
        name: "",
        category: "Apetizers",
        price: "",
        description: "",
      },
    });

  useEffect(() => {
    setValue("category", categoryOption);
  }, [categoryOption, setValue]);

  const onSelectImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setNewPreview(url);
    const persistentUrl = await uploadImage(file);
    setValue("dishImgUrl", persistentUrl);
  };

  const createDishSubmit = (data: CreateDishFormData) => {
    handleCreateDish(data);
    setShowSuccess(true);
  };
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" />
      <section className="fixed top-0 right-0 h-full z-50 w-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Add Menu</h1>

        <form
          onSubmit={handleSubmit(createDishSubmit)}
          className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-6 items-start"
        >
          {/* Left: photo */}
          <article className="md:col-span-2">
            <div className="text-sm font-medium mb-1">Photo</div>
            <ImageUploadZone
              sizeClass="w-full"
              previewSrc={newPreview || undefined}
              onSelected={onSelectImageUpload}
            />
            <p className="mt-2 text-xs text-slate-500">
              Shown exactly as it will be cropped (square).
            </p>
          </article>

          {/* Right: inputs */}
          <article className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <label className="md:col-span-4">
              <span className="text-sm font-medium">Item name</span>
              <input
                {...register("name")}
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
                placeholder="Kung Pao Chicken"
              />
            </label>

            <label className="md:col-span-2">
              <span className="text-sm font-medium">Category</span>
              <Dropdown
                options={["Appetizers", "Mains", "Noodles", "Desserts"]}
                option={categoryOption}
                setOption={setCategoryOption}
              />
            </label>

            <label className="md:col-span-2">
              <span className="text-sm font-medium">Price</span>
              <input
                {...register("price")}
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0.01"
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
                placeholder="12.00"
              />
            </label>

            <label className="md:col-span-4">
              <span className="text-sm font-medium">Description</span>
              <textarea
                {...register("description")}
                rows={3}
                className="mt-1 w-full rounded-xl ring-1 ring-slate-300 px-3 py-2 outline-none"
                placeholder="Spicy stir-fry with peanuts, chili and scallions."
              />
            </label>
            <div className="md:col-span-4 flex justify-end gap-6">
              <button
                type="button"
                onClick={closeSideBar}
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
          reset();
          setNewPreview("");
        }}
      />
    </>
  );
};

export default AddMenuSidebar;
