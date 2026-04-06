import { Fragment } from "react/jsx-runtime";
import ImageUploadZone from "../../../components/UploadZones/ImageUploadZone";
import OnBoardInput from "../../../components/Inputs/OnBoardInput";
import Dropdown from "../../../components/Dropdowns/Dropdown";
import { DishCategory } from "../../../constants/DishCategoryEnums";
import { useFormContext, useWatch } from "react-hook-form";
import { customInputCss } from "../../../constants/CustomInputCss";
import type { DraftItem } from "../../../formDataTypes/onBoarding/ownerOnBoardingForms.type";

interface OwnerStep4MenuInputsProps {
  preview?: string;
  onSelectImageUpload: (file: File) => void;
}

const OwnerStep4MenuInputs: React.FC<OwnerStep4MenuInputsProps> = ({
  preview,
  onSelectImageUpload,
}) => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useFormContext<DraftItem>();

  const category = useWatch({ control, name: "category" });
  const setCategory = (dishCategory: DishCategory) => {
    setValue("category", dishCategory);
  };

  return (
    <Fragment>
      <h3 className="text-lg font-semibold">Add an item (optional)</h3>

      <div className="mt-4 grid grid-cols-7 gap-6 items-start">
        <div className="col-span-2">
          <div className="text-sm font-medium">Photo</div>
          <ImageUploadZone
            className="aspect-square rounded-lg"
            previewSrc={preview}
            onSelected={onSelectImageUpload}
          />
          <p className="mt-2 text-xs text-slate-500">
            Shown exactly as it will be cropped (square).
          </p>
        </div>

        <div className="col-span-5 grid grid-cols-4 gap-x-4 gap-y-1">
          <OnBoardInput
            css="col-span-4"
            title="Item name"
            field="name"
            placeholder="Kung Pao Chicken"
          />

          <label className="md:col-span-2">
            <span className="text-sm font-medium">Price</span>
            <input
              {...register("price", {
                required: "Price is required",
                validate: (v) =>
                  !Number.isNaN(parseFloat(v)) && parseFloat(v) >= 0.01
                    ? true
                    : "Valid price required",
              })}
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0.01"
              className={customInputCss}
              placeholder="12.00"
            />
            {errors.price?.message && (
              <span className="text-xs text-red-600 font-medium">
                {String(errors.price.message)}
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
              option={category}
              setOption={setCategory}
              isEditing={true}
              isRegular={true}
            />
          </label>

          <label className="md:col-span-4">
            <span className="text-sm font-medium">Description</span>
            <textarea
              {...register("description", {
                required: "Description is required",
                maxLength: {
                  value: 300,
                  message: "Max 300 characters",
                },
              })}
              rows={3}
              className={customInputCss}
              placeholder="Spicy stir-fry with peanuts, chili and scallions."
            />
            {errors.description?.type === "maxLength" && (
              <span className="text-xs text-red-600 font-medium">
                {errors.description.message}
              </span>
            )}
            {errors.description?.message && (
              <span className="text-xs text-red-600 font-medium">
                {String(errors.description.message)}
              </span>
            )}
          </label>

          <div className="col-span-4 flex justify-end mt-2">
            <button
              type="submit"
              className="rounded-full px-4 py-2 text-sm font-semibold bg-black text-white hover:bg-black/90 hover:cursor-pointer"
            >
              Add item
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OwnerStep4MenuInputs;
