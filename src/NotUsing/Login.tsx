import React from "react";
import uberEatsLogo from "../logos/logo.svg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export const BASE_URL = "http://localhost:3002";

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- get login from context

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onSubmit = async ({ email, password }: ILoginForm) => {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      // show an error message if you want
      return;
    }

    const data = await res.json();

    if (data?.token) {
      // ⬇️ update AuthProvider state (this also stores the token + notifies)
      login(data.token);

      // ⬇️ now the app is in the logged-in routing branch; navigate works
      navigate("/restaurants", { replace: true });
    }
  };

  return (
    // <div className="h-screen flex items-center flex-col mt-[150px] lg:mt-28 px-10">
    <div id="main-frame" className="px-20">
      <div
        id="secondary-header"
        className="pb-20 pt-32 flex items-center justify-center"
      >
        <Link to={`/login`}>
          <img src={uberEatsLogo} className="w-64" alt="Nuber Eats"></img>
        </Link>
      </div>
      <div id="contents" className="flex flex-col items-center justify-center">
        <form
          // onSubmit={handleSubmit(login)}
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-2 w-[600px] py-2"
        >
          <input
            {...register("email", {
              required: "Email is required",
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            placeholder="Email"
            className="input border-2 py-2 pl-4"
          />
          {errors.email?.message && (
            <span className="font-medium text-red-500">
              {errors.email?.message}
            </span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="font-medium text-red-500">
              {"Please enter a valid email"}
            </span>
          )}
          <input
            {...register("password", {
              required: "Password is required",
            })}
            name="password"
            type="password"
            placeholder="Password"
            className="input border-2 py-2 pl-4"
          />
          {errors.password?.message && (
            <span className="font-medium text-red-500">
              {errors.password?.message}
            </span>
          )}

          <button
            className={`text-lg rounded-sm font-medium text-white py-4 transition-colors ${
              isValid
                ? "bg-lime-600 hover:bg-lime-700 active:bg-lime-800"
                : "bg-gray-300 pointer-events-none "
            }`}
          >
            Log in
          </button>
        </form>
        <div
          id="info-form"
          className="flex flex-col justify-center items-center"
        >
          <div className="py-5">
            <div className="border-b-2 border-gray-300 w-[600px]"></div>
          </div>
          <div className="">New to Uber?</div>
          <Link to={"/create-account"}>
            <div className="text-lime-600 hover:underline">
              Create an Account
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
