import BasicLockIcon from "../components/Icons/BasicLockIcon";
import BasicStoreIcon from "../components/Icons/BasicStoreIcon";
import RoleCard from "../components/Cards/RoleCard";
import CreateAccountChoiceFooter from "../components/Footers/CreateAccountChoiceFooter";
import { useNavigate } from "react-router-dom";

export default function CreateAccountChoice() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen content-center py-2">
      <main>
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-2xl max-md:mt-10 md:text-3xl lg:text-5xl font-extrabold tracking-tight">
            Choose how you want to continue
          </h1>
          <p className="mt-3 text-sm md:text-xl text-slate-600">
            One account to order food or manage your restaurant.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-5 font-semibold bg-black/90 text-white hover:cursor-pointer px-5 py-2 rounded-full border border-gray-300 text-xs"
          >
            Back to sign in
          </button>
        </section>

        <section className="mt-8 max-w-[1000px] mx-auto">
          <div className="grid grid-cols-2 max-[650px]:grid-cols-1 max-[650px]:px-10 gap-6">
            {/* Customer */}
            <RoleCard
              navigateTo="/on-board/client/step1"
              tone="emerald"
              badge={{ label: "Popular" }}
              icon={<BasicLockIcon />}
              title="Order as Customer"
              desc="Browse local restaurants and get meals delivered fast."
              points={[
                "Discover thousands of local favorites",
                "Exclusive deals & promos",
                "Track delivery in real time",
              ]}
              ctaColor="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
            />

            {/* Owner */}
            <RoleCard
              navigateTo="/on-board/owner/step1"
              tone="amber"
              badge={{ label: "Popular" }}
              icon={<BasicStoreIcon />}
              title="Manage as Owner"
              desc="Connect your restaurant and start taking online orders."
              points={[
                "List your menu in minutes",
                "Manage orders & payouts",
                "Insights, ratings & reports",
              ]}
              ctaColor="bg-amber-500 hover:bg-amber-600 active:bg-amber-800"
            />
          </div>
          <CreateAccountChoiceFooter />
        </section>
      </main>
    </div>
  );
}
