import MainHeaderV2 from "../components/Headers/MainHeaderV2";
import LoginButton from "../components/Buttons/LoginButton";
import GlobalLayout from "../components/GlobalLayout";
import LockIcon from "../icons/LockIcon";
import CarIcon from "../icons/CarIcon";
import StoreIcon from "../icons/StoreIcon";
import RoleCard from "../components/Cards/RoleCard";

export default function CreateAccountChoice() {
  return (
    <GlobalLayout>
      <MainHeaderV2 signIn={<LoginButton />} />

      {/* Fill the viewport (minus header) and center */}
      <main
        className={`py-10 lg:py-14
        min-[1800px]:w-[1750px]
        mx-auto
        `}
      >
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Choose how you want to continue
          </h1>
          <p className="mt-3 text-lg md:text-xl text-slate-600">
            One account to order food, deliver with Uber, or manage your
            restaurant.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            You can switch roles anytime from your profile.
          </p>
        </section>

        {/* Role cards */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer */}
          <RoleCard
            navigateTo="/customer-on-board-step-1"
            tone="emerald"
            badge={{ label: "Popular" }}
            icon={<LockIcon />}
            title="Order as Customer"
            desc="Browse local restaurants and get meals delivered fast."
            points={[
              "Discover thousands of local favorites",
              "Exclusive deals & promos",
              "Track delivery in real time",
            ]}
            ctaColor="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
          />

          {/* Driver */}
          <RoleCard
            navigateTo="/driver-on-board-step-1"
            tone="blue"
            badge={{ label: "Deliver" }}
            icon={<CarIcon />}
            title="Deliver as Driver"
            desc="Earn on your schedule by delivering with Uber."
            points={[
              "Set your own hours",
              "Get paid weekly",
              "In-app navigation & support",
            ]}
            ctaColor="bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
          />

          {/* Owner */}
          <RoleCard
            navigateTo="/owner-on-board-step-1"
            tone="amber"
            badge={{ label: "Popular" }}
            icon={<StoreIcon />}
            title="Manage as Owner"
            desc="Connect your restaurant and start taking online orders."
            points={[
              "List your menu in minutes",
              "Manage orders & payouts",
              "Insights, ratings & reports",
            ]}
            ctaColor="bg-amber-500 hover:bg-amber-600 active:bg-amber-800"
          />
        </section>

        {/* Foot note / policy (optional, looks nice full-width) */}
        <section className="mt-10">
          <div className="mx-auto max-w-3xl rounded-xl bg-white/80 backdrop-blur ring-1 ring-black/10 p-4 text-center">
            <p className="text-[13px] text-slate-600">
              By continuing, you agree to Uber Eats’{" "}
              <a
                href="/legal/terms"
                className="underline decoration-slate-300 underline-offset-2 hover:text-slate-800"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/legal/privacy"
                className="underline decoration-slate-300 underline-offset-2 hover:text-slate-800"
              >
                Privacy Policy
              </a>
              . This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-slate-300 underline-offset-2 hover:text-slate-800"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-slate-300 underline-offset-2 hover:text-slate-800"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </section>
      </main>
    </GlobalLayout>
  );
}
