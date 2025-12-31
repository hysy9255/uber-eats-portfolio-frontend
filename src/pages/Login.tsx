import { Link, useNavigate } from "react-router-dom";
import bannerImg from "../images/loginBanner.png";

import { useForm } from "react-hook-form";
import LoginPolicy from "../components/LoginPolicy";
import MainHeaderV2 from "../components/Headers/MainHeaderV2";

import GlobalLayout from "../components/GlobalLayout";
import EmailIcon from "../icons/EmailIcon";
import LockIcon2 from "../icons/LockIcon2";
import ShowPasswordButton from "../components/Buttons/ShowPasswordButton";
import { loginUser } from "../api/userApi";
import { useAuth } from "../ReactContext/auth/UseAuth";
import SignUpButton from "../components/Buttons/SignUpButton";

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    mode: "onSubmit",
  });

  const onSubmit = async ({ email, password }: ILoginForm) => {
    const data = await loginUser(email, password);

    if (data?.token) {
      login(data.token);

      if (data.role === "owner") {
        navigate("/dashboard/overview", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <GlobalLayout>
      <MainHeaderV2 signIn={<SignUpButton />} />
      <main
        className={`
        py-10 sm:py-12 
        grid grid-cols-1 
        min-[1000px]:grid-cols-2
        min-[460px]:w-[410px]
        min-[700px]:w-[650px]
        min-[1000px]:w-[950px]
        min-[1300px]:w-[1250px]
        mx-auto
        `}
      >
        <section
          className={`rounded-2xl ring-1 ring-black/10 shadow-sm
                        p-8 flex flex-col `}
        >
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-slate-600">Sign in to continue</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email / phone */}
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Email</span>
              <div
                className="
              flex items-center gap-2 h-12 rounded-xl 
              bg-white ring-1 ring-black/10 px-3 
              focus-within:ring-black/20"
              >
                <EmailIcon />
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
                <span className="font-medium text-red-500">
                  {errors.email?.message}
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="font-medium text-red-500">
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
                <LockIcon2 />
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
                <span className="font-medium text-red-500">
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
                            disabled:opacity-60 disabled:pointer-events-none"
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

        <aside
          className={`
            relative hidden 
            min-[1000px]:block rounded-2xl 
            overflow-hidden`}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-700 bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerImg})` }}
          />
        </aside>
      </main>
    </GlobalLayout>
  );
}
