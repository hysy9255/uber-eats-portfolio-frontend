import { Link, useNavigate } from "react-router-dom";
import bannerImg from "../images/loginBanner.png";
import { useAuth } from "../AuthContext";
import { useForm } from "react-hook-form";
import LoginPolicy from "../components/LoginPolicy";
import MainHeaderV2 from "../components/MainHeaderV2";
import SignupButton from "../components/SignupButton";

const rail = "mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8";
const columnH = "min-h-[680px] sm:min-h-[820px]"; // ← 둘 다 여기에 맞춤

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
    const res = await fetch(`http://localhost:3002/users/login`, {
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
      if (data.role === "owner") {
        navigate("/dashboard/overview", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 flex flex-col">
      <MainHeaderV2 layoutWidth={rail} signIn={<SignupButton />} />

      <main className={`${rail} py-10 sm:py-12 flex-1 flex items-center`}>
        {/* 윗변 정렬 + 동일한 높이 */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Form card */}
          <section
            className={`rounded-2xl SignupButton-white ring-1 ring-black/10 shadow-sm
                        p-6 sm:p-8 flex flex-col ${columnH}`}
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-slate-600">Sign in to continue</p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Email / phone */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  Email or phone
                </span>
                <div className="flex items-center gap-2 h-12 rounded-xl bg-white ring-1 ring-black/10 px-3 focus-within:ring-black/20">
                  <svg
                    className="w-5 h-5 text-slate-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16v16H4z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
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
                  <a
                    className="text-sm text-slate-600 hover:underline"
                    href="#"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="flex items-center gap-2 h-12 rounded-xl bg-white ring-1 ring-black/10 px-3 focus-within:ring-black/20">
                  <svg
                    className="w-5 h-5 text-slate-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="4" y="11" width="16" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="flex-1 bg-transparent outline-none placeholder-slate-400"
                  />

                  <button
                    type="button"
                    className="p-1.5 rounded-md hover:bg-gray-100"
                    aria-label="Show password"
                  >
                    <svg
                      className="w-5 h-5 text-slate-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
                {errors.password?.message && (
                  <span className="font-medium text-red-500">
                    {errors.password?.message}
                  </span>
                )}
              </label>

              {/* Remember me (UI-only) */}
              <label className="mt-1 inline-flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-black/20 text-black"
                />
                <span className="text-sm text-slate-700">
                  Keep me signed in
                </span>
              </label>

              {/* Submit (UI only) */}
              {/* <button
                type="submit"
                className="w-full h-12 rounded-full bg-black text-white font-semibold hover:bg-black/90"
              >
                Sign in
              </button> */}
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-black text-white font-semibold
             transition duration-200
             hover:bg-black/90 active:bg-black/80
             focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white
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

          {/* Right: Visual panel */}
          <aside
            className={`relative hidden lg:block rounded-2xl overflow-hidden ${columnH}`}
          >
            {/* 배경 그라데이션 (원하면 이미지로 변경) */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-700 bg-cover bg-center"
              style={{ backgroundImage: `url(${bannerImg})` }}
            />
            {/* 유리 카드 */}
            <div className="absolute inset-0 p-8 flex items-end">
              <div className="w-full rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/30 p-6 text-white">
                <div className="text-sm opacity-90">Tip</div>
                <div className="mt-1 text-xl font-semibold leading-snug">
                  Save your addresses for faster checkout next time.
                </div>
              </div>
            </div>
            {/* 라이트 스팟 */}
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute -bottom-20 -right-10 w-80 h-80 rounded-full bg-white/20 blur-3xl" />
          </aside>
        </div>
      </main>
    </div>
  );
}
