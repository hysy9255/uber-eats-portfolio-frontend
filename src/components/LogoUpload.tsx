import { useRef, useState } from "react";
import { uploadImage } from "../utils/uploadImg";
import CameraIcon from "./Icons/CameraIcon/CameraIcon";
import LogoUploadPopUp from "./PopUps/LogoUploadPopUp";
import type { UpdateRestaurantDTO } from "../dtos/restaurant/UpdateRestaurant.dto";
import { updateRestaurant } from "../api/restaurantApi";
import { getToken } from "../auth";
import { useMyRestaurant } from "../ReactContext/myRestaurant/UseMyRestaurant";

const LogoUpload = () => {
  const token = getToken();
  if (!token) throw new Error("No Token");

  const { restaurant, loadRestaurantData } = useMyRestaurant();

  const [logoPreview, setLogoPreview] = useState<string | undefined>(
    () => restaurant.restaurantSummary.generalInfo.logo
  );

  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleChangeLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
    setSelectedFile(file);
    setFileSelected(true);
    e.target.value = "";
  };

  const saveLogo = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    const uploadedUrl = await uploadImage(selectedFile);
    const { restaurantId } = restaurant.restaurantSummary.generalInfo;

    const payload: UpdateRestaurantDTO = {
      generalInfo: { restaurantId, logo: uploadedUrl },
    };
    await updateRestaurant(token, payload);
    await loadRestaurantData();
    setFileSelected(false);
    setPopUpOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChangeLogo}
      />
      <div className="border-2 border-gray-300 max-w-[200px] aspect-square flex items-center justify-center rounded-full overflow-hidden">
        {restaurant.restaurantSummary.generalInfo.logo ? (
          <img
            src={restaurant.restaurantSummary.generalInfo.logo}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-xs text-gray-500">No Logo Image</div>
        )}
      </div>
      <button
        onClick={() => setPopUpOpen(true)}
        className="rounded border border-gray-300 flex items-center px-5 py-1 gap-1 text-xs bg-gray-50 hover:bg-gray-200/50 active:bg-gray-200/80 hover:cursor-pointer"
      >
        <CameraIcon className="w-5 h-5" />
        <span>Change Logo</span>
      </button>
      {popUpOpen && (
        <LogoUploadPopUp
          preview={logoPreview}
          openFilePicker={openFilePicker}
          saveLogo={saveLogo}
          closePopUp={() => setPopUpOpen(false)}
          fileSelected={fileSelected}
        />
      )}
    </div>
  );
};

export default LogoUpload;
