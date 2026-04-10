import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginPolicy from "../components/LoginPolicy";
import GrayEmailIcon from "../components/Icons/GrayEmailIcon";
import GrayLockIcon from "../components/Icons/GrayLockIcon";
import ShowPasswordButton from "../components/Buttons/IconBased/EyeButton/EyeButton";
import { useAuth } from "../ReactContext/auth/UseAuth";
import LogInBannerImg from "../components/Images/LogInBannerImg/LogInBannerImg";
import { UserRole } from "../constants/UserRoleEnum";
import { loginUser } from "../api/authApi";
import ErrorModal from "../components/Modals/ErrorModal";
import { Fragment, useState } from "react";
import type { LoginForm } from "../formDataTypes/auth/loginForm.type";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onSubmit",
  });

  const onSubmit = async ({ email, password }: LoginForm) => {
    try {
      const data = await loginUser({ email, password });

      if (data?.token) {
        login(data.token);

        if (data.role === UserRole.Owner) {
          navigate("/dashboard/overview", { replace: true });
        } else if (data.role === UserRole.Client) {
          navigate("/client/restaurants", { replace: true });
        }
      }
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";

      setLoginError(msg);
    }
  };

  return (
    <Fragment>
      {loginError && (
        <ErrorModal
          onClickClose={() => setLoginError(undefined)}
          errorMessage={loginError}
        />
      )}

      <main className="grid grid-cols-1 min-[950px]:grid-cols-2 max-w-[950px] mx-auto min-h-screen content-center">
        <section
          className={`rounded-2xl ring-1 ring-black/10 shadow-sm
                        p-5 flex flex-col `}
        >
          <h1 className="text-xl font-extrabold tracking-tight">
            Welcome back 5
          </h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to continue</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Email</span>
              <div
                className="
              flex items-center gap-2 h-12 rounded-xl 
              bg-white ring-1 ring-black/10 px-3 
              focus-within:ring-black/20"
              >
                <GrayEmailIcon />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  name="email"
                  type="text"
                  placeholder="your@example.com"
                  className="flex-1 bg-transparent outline-none placeholder-slate-400"
                />
              </div>
              {errors.email?.message && (
                <span className=" text-red-500 text-xs">
                  {errors.email?.message}
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="text-red-500 text-xs">
                  {"Please enter a valid email"}
                </span>
              )}
            </label>

            {/* Password */}
            <label className="block">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Password</span>
                <a className="text-sm text-slate-600 hover:underline" href="#">
                  Forgot?
                </a>
              </div>
              <div className="flex items-center gap-2 h-12 rounded-xl bg-white ring-1 ring-black/10 px-3 focus-within:ring-black/20">
                <GrayLockIcon />
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="flex-1 bg-transparent outline-none placeholder-slate-400"
                />
                <ShowPasswordButton />
              </div>
              {errors.password?.message && (
                <span className="text-xs text-red-500">
                  {errors.password?.message}
                </span>
              )}
            </label>

            <label className="mt-1 inline-flex items-center gap-2 select-none">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-black/20 text-black"
              />
              <span className="text-sm text-slate-700">Keep me signed in</span>
            </label>

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-black text-white font-semibold
                            transition duration-200
                            hover:bg-black/90 active:bg-black/80
                            focus:outline-none focus-visible:ring-2 
                            focus-visible:ring-black/30 focus-visible:ring-offset-2
                             focus-visible:ring-offset-white
                            disabled:opacity-60 disabled:pointer-events-none
                            hover:cursor-pointer
                            "
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link
              to="/create-account-choice"
              className="font-medium hover:underline"
            >
              Create account
            </Link>
          </p>
          <LoginPolicy />
        </section>

        <LogInBannerImg className="rounded-2xl bg-cover bg-center" />
      </main>
    </Fragment>
  );
}
