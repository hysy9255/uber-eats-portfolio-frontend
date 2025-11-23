import React from "react";
import uberEatsLogo from "../logos/logo.svg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../auth";
import { uploadImage } from "../utils/uploadImg";

interface ICreateRestaurantForm {
  name: string;
  address: string;
  file: FileList;
  file2: FileList;
  file3: FileList;
}

const createRestaurant = async (
  payload: {
    name: string;
    address: string;
    restaurantImgUrl: string;
    restaurantImgUrl2: string;
    restaurantImgUrl3: string;
  },
  token: string
) => {
  const res = await fetch(`http://localhost:3002/restaurants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "jwt-token": token,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

const CreateRestaurant = () => {
  const {
    register,
    // getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<ICreateRestaurantForm>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const handleCreateRestaurantSubmit = async (form: ICreateRestaurantForm) => {
    try {
      // if (!restaurantId) throw new Error("Missing restaurantId in URL");
      const token = getToken();
      if (!token) throw new Error("No token");

      const file = form.file?.[0];
      if (!file) throw new Error("No file selected");

      const restaurantImgUrl = await uploadImage(file);

      const file2 = form.file2?.[0];
      if (!file2) throw new Error("No file selected");

      const restaurantImgUrl2 = await uploadImage(file2);

      const file3 = form.file3?.[0];
      if (!file3) throw new Error("No file selected");

      const restaurantImgUrl3 = await uploadImage(file3);

      await createRestaurant(
        {
          name: form.name,
          address: form.address,
          restaurantImgUrl,
          restaurantImgUrl2,
          restaurantImgUrl3,
        },
        token
      );

      navigate("/restaurants");
      // navigate(`/restaurants/${restaurantId}`);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  return (
    <div id="main-frame" className="px-20">
      <div
        id="secondary-header"
        className="pb-20 pt-32 flex items-center justify-center"
      >
        <Link to={`/`}>
          <img src={uberEatsLogo} className="w-64" alt="Nuber Eats"></img>
        </Link>
      </div>

      <div id="contents" className="flex flex-col items-center justify-center]">
        <form
          onSubmit={handleSubmit(handleCreateRestaurantSubmit)}
          className="grid gap-2 w-[600px]"
        >
          <input
            {...register("name", {
              required: "Restaurant name is required",
            })}
            placeholder="Name"
            className="input border-2 py-2 pl-4"
          />

          <input
            {...register("address", {
              required: "Address is required",
              maxLength: 100,
            })}
            placeholder="Address"
            className="input border-2 py-2 pl-4"
          />

          <div className="border-2 border-gray-200 p-3">
            <label htmlFor="file1" className="font-semibold">
              Main Image (Representative)
            </label>
            <p className="text-sm text-gray-500 mb-2">
              This image will be the main representation of your restaurant.
            </p>
            <input
              {...register("file", {
                required: "Image file is required",
              })}
              type="file"
              accept="image/*"
            />
          </div>

          <div className="border-2 border-gray-200 p-3">
            <label htmlFor="file2" className="font-semibold">
              Sub Image 1
            </label>
            <p className="text-sm text-gray-500 mb-2">
              This image will be the first sub representation of your
              restaurant.
            </p>
            <input
              {...register("file2", {
                required: "Image file is required",
              })}
              type="file"
              accept="image/*"
            />
          </div>

          <div className="border-2 border-gray-200 p-3">
            <label htmlFor="file3" className="font-semibold">
              Sub Image 2
            </label>
            <p className="text-sm text-gray-500 mb-2">
              This image will be the second sub representation of your
              restaurant.
            </p>
            <input
              {...register("file3", {
                required: "Image file is required",
              })}
              type="file"
              accept="image/*"
            />
          </div>

          <div className="grid gap-4 grid-cols-2">
            <button
              className={`text-lg rounded-sm font-medium text-white py-4 transition-colors ${
                isValid
                  ? "bg-lime-600 hover:bg-lime-700 active:bg-lime-800"
                  : "bg-gray-300 pointer-events-none "
              }`}
            >
              Create Restaurant
            </button>
            <button className="text-lg rounded-sm font-medium text-white py-4 bg-gray-300 hover:bg-gray-400 active:bg-gray-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurant;
