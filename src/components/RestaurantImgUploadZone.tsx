import { useRef, useState } from "react";
import { useMyRestaurant } from "../ReactContext/myRestaurant/UseMyRestaurant";

type RestaurantImageField =
  | "mainImgUrl"
  | "sub1ImgUrl"
  | "sub2ImgUrl"
  | "bannerImgUrl";

interface RestaurantImgUploadZoneProps {
  className?: string;
  titleName?: string;
  field: RestaurantImageField;
  aspect: string;
}

const RestaurantImgUploadZone: React.FC<RestaurantImgUploadZoneProps> = ({
  className,
  titleName,
  field,
  aspect,
}) => {
  const { restaurant } = useMyRestaurant();
  const [preview, setPreview] = useState<string>(
    () => restaurant.restaurantSummary.generalInfo[field]
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
    // const uploadedUrl = await uploadImage(file);
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
        className={`border-2 border-gray-300 ${aspect} rounded-md hover:cursor-pointer overflow-hidden`}
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
