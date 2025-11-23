import uberEatsLogo from "../logos/logo.svg";
import profileImg from "../images/profile/profile.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { uploadImage } from "../utils/uploadImg";

interface ICreateAccountForm {
  email: string;
  password: string;
  role: string;
  name: string;
  phoneNumber: string;
  file: FileList;
}

const createAccount = async (payload: {
  email: string;
  password: string;
  role: string;
  name: string;
  phoneNumber: string;
  profileImgUrl: string;
}) => {
  const res = await fetch(`http://localhost:3002/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const handleCreateAccountSubmit = async (form: ICreateAccountForm) => {
    try {
      const file = form.file?.[0];
      if (!file) throw new Error("No file selected");

      const profileImgUrl = await uploadImage(file);

      await createAccount({
        email: form.email,
        password: form.password,
        role: form.role,
        name: form.name,
        phoneNumber: form.phoneNumber,
        profileImgUrl,
      });
      navigate("/");
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
        <img
          src={profileImg}
          className="w-52 border-2 rounded-full"
          alt="Profile"
        ></img>
        <form
          onSubmit={handleSubmit(handleCreateAccountSubmit)}
          className="grid gap-2 w-[600px] py-2"
        >
          <input
            {...register("email", {
              required: "Email is required",
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            required
            name="email"
            placeholder="email"
            className="input border-2 py-2 pl-4"
          />
          <input
            {...register("password", {
              required: "Password is required",
            })}
            required
            name="password"
            placeholder="password"
            className="input border-2 py-2 pl-4"
          />
          <select
            {...register("role", { required: true })}
            className="input border-2 py-2 pl-3"
          >
            {["owner", "client", "driver"].map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <input
            {...register("name", {
              required: "Name is required",
            })}
            required
            name="name"
            placeholder="name"
            className="input border-2 py-2 pl-4"
          />
          <input
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            required
            name="phoneNumber"
            placeholder="phone number"
            className="input border-2 py-2 pl-4"
          />
          <div className="border-2 border-gray-200 p-3">
            <label className="font-semibold">Profile Image</label>
            <p className="text-sm text-gray-500 mb-2">
              This image will be the main representation of your profile.
            </p>
            <input
              {...register("file", {
                required: "Image file is required",
              })}
              type="file"
              accept="image/*"
            />
          </div>
          <button
            className={`text-lg rounded-sm font-medium text-white py-4 transition-colors ${
              isValid
                ? "bg-lime-600 hover:bg-lime-700 active:bg-lime-800"
                : "bg-gray-300 pointer-events-none "
            }`}
          >
            Create Account
          </button>
        </form>
        <div
          id="info-form"
          className="flex flex-col justify-center items-center"
        >
          <div className="py-5">
            <div className="border-b-2 border-gray-300 w-[600px]"></div>
          </div>
          <div className="">Already has an account?</div>
          <Link to={"/"}>
            <div className=" text-lime-600 hover:underline">Login</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
