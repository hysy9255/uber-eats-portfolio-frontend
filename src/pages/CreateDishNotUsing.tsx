import React from "react";
import { useForm } from "react-hook-form";
import uberEatsLogo from "../logos/logo.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getToken } from "../auth";
import { uploadImage } from "../utils/uploadImg";

interface ICreateDishForm {
  name: string;
  category: string;
  price: number;
  descriptions: string;
  file: FileList;
}

const createDish = async (
  restaurantId: string,
  payload: {
    name: string;
    category: string;
    price: number;
    descriptions: string;
    dishImgUrl: string;
  },
  token: string
) => {
  const res = await fetch(
    `http://localhost:3002/restaurants/${restaurantId}/dishes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwt-token": token,
      },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) throw new Error(await res.text());
};

const CreateDishNotUsing = () => {
  const {
    register,
    // getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<ICreateDishForm>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { restaurantId } = useParams();

  const handleCreateDishSubmit = async (form: ICreateDishForm) => {
    try {
      if (!restaurantId) throw new Error("Missing restaurantId in URL");
      const token = getToken();
      if (!token) throw new Error("No token");

      const file = form.file?.[0];
      if (!file) throw new Error("No file selected");

      const dishImgUrl = await uploadImage(file);

      await createDish(
        restaurantId,
        {
          name: form.name,
          category: form.category,
          price: form.price,
          descriptions: form.descriptions,
          dishImgUrl,
        },
        token
      );

      navigate(`/restaurants/${restaurantId}`);
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

      <div id="contents" className="flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(handleCreateDishSubmit)}
          className="grid gap-2 w-[600px]"
        >
          <input
            {...register("name", {
              required: "Dish name is required",
            })}
            placeholder="Dish Name"
            className="input border-2 py-2 pl-4"
          />

          <input
            {...register("category", {
              required: "Dish category is required",
            })}
            placeholder="Dish Category"
            className="input border-2 py-2 pl-4"
          />

          <input
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            // onInput={(e) => sanitizeInputValueForPrice(e)}
            placeholder="Price"
            className="input border-2 py-2 pl-4"
          />

          <input
            {...register("descriptions", {
              required: "Description is required",
            })}
            placeholder="Dish Description"
            className="input border-2 py-2 pl-4"
          />

          <div className="border-2 border-gray-200 p-3">
            <label className="font-semibold">Dish Image</label>
            <p className="text-sm text-gray-500 mb-2">
              This image will be the main representation of your dish.
            </p>
            <input
              {...register("file", {
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
              Create Dish
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

export default CreateDishNotUsing;
