import { useRef, useState } from "react";
import { useMyRestaurant } from "../ReactContext/myRestaurant/UseMyRestaurant";
import { uploadImage } from "../utils/uploadImg";
import { useFormContext } from "react-hook-form";
import type { EditRestaurantInfoForm } from "../formDataTypes/restaurant/editRestaurantInfoForm.type";

type RestaurantImageField =
  | "mainImgUrl"
  | "sub1ImgUrl"
  | "sub2ImgUrl"
  | "bannerImgUrl";

interface RestaurantImgUploadZoneProps {
  className?: string;
  titleName?: string;
  isEditing?: boolean;
  field: RestaurantImageField;
  aspect: string;
}

const RestaurantImgUploadZone: React.FC<RestaurantImgUploadZoneProps> = ({
  className,
  titleName,
  field,
  aspect,
  isEditing,
}) => {
  const methods = useFormContext<EditRestaurantInfoForm>();
  const { restaurant } = useMyRestaurant();
  const [preview, setPreview] = useState<string>(
    () => restaurant.generalInfo[field]
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    const uploadedUrl = await uploadImage(file);
    methods.setValue(field, uploadedUrl);
    e.target.value = "";
  };
  return (
    <div className={`${className}`}>
      <h2 className="text-sm text-gray-700">{titleName}</h2>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      <div
        onClick={() => {
          if (!isEditing) return;
          inputRef.current?.click();
        }}
        className={`border-2 ${aspect} rounded-md hover:cursor-pointer overflow-hidden ${
          isEditing ? "border-blue-300" : "border-gray-300"
        }  `}
      >
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" />
        ) : (
          <div className="text-xs text-gray-500 bg-neutral-100 w-full h-full flex items-center justify-center">
            No Image
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantImgUploadZone;
