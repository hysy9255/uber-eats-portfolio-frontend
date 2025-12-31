import { useState } from "react";
import WizardShell from "../components/Shells/WizardShell";
import ImageUploadZone from "../components/UploadZones/ImageUploadZone";
import CsvUploadZone from "../components/UploadZones/CsvUploadZone";
import { useNavigate } from "react-router-dom";
import { loadDraft, saveDraft } from "../utils/localDraft";
import { useForm, useWatch } from "react-hook-form";
import { CREATE_OWNER_PAGE_STEPS } from "../constants/CreateOwnerPageSteps";
import { uploadImage } from "../utils/uploadImg";
import {
  OWNER_STEP4_KEY,
  type DraftItem,
  type IOwnerOnBoardingStep4Form,
} from "./types/OwnerOnBoardingStep4Menu.type";
import { customInputCss } from "../constants/CustomInputCss";
import Dropdown2 from "../components/Dropdowns/Dropdown2";
import { ownerOnboardStep4DefaultValues } from "../constants/DefaultValues";
import { DishCategory } from "../constants/DishCategoryEnums";

export default function OwnerOnboardingMenu() {
  const navigate = useNavigate();
  const defaultValues = loadDraft<IOwnerOnBoardingStep4Form>(
    OWNER_STEP4_KEY,
    ownerOnboardStep4DefaultValues
  );

  const methods = useForm<DraftItem>({
    mode: "onChange",
    defaultValues: {
      name: "",
      price: "",
      category: DishCategory.Appetizers,
      description: "",
      imagePreview: "",
      imageFile: null,
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [fields, setFields] = useState<DraftItem[]>(defaultValues.items);
  const [newPreview, setNewPreview] = useState("");

  const onSelectImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setNewPreview(url);
    const persistentUrl = await uploadImage(file);
    setValue("imagePreview", persistentUrl);
  };

  const onRemove = (i: number) => {
    const newItems = fields.filter((_, index) => index !== i);
    setFields(newItems);
    saveDraft(OWNER_STEP4_KEY, {
      items: newItems,
    });
  };

  // ---------- Quick Add: submit 핸들러 ----------
  const onAddItem = (data: DraftItem) => {
    setFields((prev) => [...prev, data]);
    saveDraft(OWNER_STEP4_KEY, {
      items: [...fields, data],
    });
    reset();
    setNewPreview("");
  };

  const onCsvUploaded = (res: IOwnerOnBoardingStep4Form) => {
    const newItems = [...fields, ...res.items];
    setFields(newItems);
    saveDraft(OWNER_STEP4_KEY, {
      items: newItems,
    });
  };

  // ---------- nav (스킵 가능) ----------
  const onContinue = () => navigate("/owner-on-board-step-5");
  const onBack = () => navigate("/owner-on-board-step-3");

  const category = useWatch({ control: methods.control, name: "category" });
  const setCategory = (dishCategory: DishCategory) => {
    methods.setValue("category", dishCategory);
  };

  return (
    <WizardShell
      onContinue={onContinue}
      onBack={onBack}
      title="Set up your menu"
      subtitle="You can skip this step and add items later."
      steps={CREATE_OWNER_PAGE_STEPS}
      active={3}
      right={
        <div>
          <p className="text-sm font-medium text-slate-700">Guidelines</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Clear dish names and descriptions</li>
            <li>• High-quality images (1200×800 recommended)</li>
            <li>• Include allergen information</li>
          </ul>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Bulk import */}
        <div className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Bulk import</h3>
          </div>
          <CsvUploadZone mode="append" onUploaded={onCsvUploaded} />
        </div>

        {/* Draft items (useFieldArray) */}
        <div className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Draft items</h3>
            {/* {errors.items?.message && (
              <span className="text-sm font-medism text-red-600">
                {String(errors.items.message)}
              </span>
            )} */}
          </div>

          {fields.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              No items yet. Use “Add an item” below or import from CSV
              (optional).
            </p>
          ) : (
            <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((f, i) => {
                const item = f;
                return (
                  <li
                    // key={f.id}
                    className="flex gap-3 items-center rounded-lg ring-1 ring-slate-200 p-3"
                  >
                    {item.imagePreview ? (
                      <img
                        src={item.imagePreview}
                        alt={item.name}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-md bg-slate-100 grid place-items-center text-xs text-slate-500">
                        No image
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-sm text-slate-600">
                        {item.category} · ${Number(item.price).toFixed(2)}
                      </div>
                      {item.description && (
                        <div className="text-xs text-slate-500 truncate">
                          {item.description}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(i)}
                      className="ml-auto rounded-full px-2 py-1 text-xs ring-1 ring-slate-300 hover:bg-slate-50 hover:cursor-pointer"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Quick Add = 독립 submit form */}
        <form
          noValidate
          onSubmit={handleSubmit(onAddItem)}
          className="rounded-xl ring-1 ring-slate-200 p-5 bg-white"
        >
          <h3 className="text-lg font-semibold">Add an item (optional)</h3>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-6 items-start">
            {/* Left: photo */}
            <div className="md:col-span-2">
              <div className="text-sm font-medium mb-1">Photo</div>
              <ImageUploadZone
                className="aspect-square"
                previewSrc={newPreview || undefined}
                onSelected={onSelectImageUpload}
              />
              <p className="mt-2 text-xs text-slate-500">
                Shown exactly as it will be cropped (square).
              </p>
            </div>

            {/* Right: inputs */}
            <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="md:col-span-4">
                <span className="text-sm font-medium">Item name</span>
                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className={customInputCss}
                  placeholder="Kung Pao Chicken"
                />
                {errors?.name?.message && (
                  <span className="text-sm text-red-600 font-medium">
                    {String(errors?.name?.message)}
                  </span>
                )}
              </label>

              <label className="md:col-span-2">
                <span className="text-sm font-medium">Category</span>
                <Dropdown2
                  option={category}
                  setOption={setCategory}
                  options={[
                    DishCategory.Appetizers,
                    DishCategory.Mains,
                    DishCategory.Desserts,
                    DishCategory.Drinks,
                  ]}
                />
              </label>

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
                {errors?.price?.message && (
                  <span className="text-sm text-red-600 font-medium">
                    {String(errors?.price?.message)}
                  </span>
                )}
              </label>

              <label className="md:col-span-4">
                <span className="text-sm font-medium">Description</span>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    maxLength: { value: 300, message: "Max 300 characters" },
                    // maxLength: { value: 5, message: "Max 5 characters" },
                  })}
                  rows={3}
                  className={customInputCss}
                  placeholder="Spicy stir-fry with peanuts, chili and scallions."
                />
                {errors?.description?.type === "maxLength" && (
                  <span className="text-sm text-red-600 font-medium">
                    {errors.description.message}
                  </span>
                )}
                {errors?.description?.message && (
                  <span className="text-sm text-red-600 font-medium">
                    {String(errors?.description?.message)}
                  </span>
                )}
              </label>

              <div className="md:col-span-4 flex justify-end">
                {/* 폼 제출 버튼 → 검증 실행 */}
                <button
                  type="submit"
                  className="rounded-full px-4 py-2 text-sm font-semibold bg-black text-white hover:bg-black/90 hover:cursor-pointer"
                >
                  Add item
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* </FormProvider> */}
    </WizardShell>
  );
}
