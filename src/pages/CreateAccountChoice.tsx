// CreateAccountChoice.tsx
import React from "react";
import { Link } from "react-router-dom";
import MainHeaderV2 from "../components/MainHeaderV2";
import LoginButton from "../components/LoginButton";

const rail = "mx-auto max-w-screen-2xl px-6 lg:px-10";

export default function CreateAccountChoice() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      {/* Top bar */}
      {/* <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-black/5">
        <div className={`${rail} h-16 flex items-center justify-between`}>
          <div className="text-2xl font-semibold">
            Uber <span className="text-emerald-600">Eats</span>
          </div>
          <nav aria-label="Primary" className="flex items-center gap-4 text-sm">
            <Link to="/login" className="hover:underline">
              Log in
            </Link>
          </nav>
        </div>
      </header> */}

      <MainHeaderV2
        layoutWidth={rail}
        signIn={<LoginButton />}
        // loggedIn={false}
      />

      {/* Fill the viewport (minus header) and center */}
      <main
        className={`${rail} min-h-[calc(100vh-64px)] flex items-center py-10 lg:py-14`}
      >
        <div className="w-full">
          {/* Hero */}
          <div className="text-center">
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
          </div>

          {/* Role cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Customer */}
            <RoleCard
              navigateTo="/customer-on-board-step-1"
              tone="emerald"
              badge={{ label: "Popular" }}
              icon={
                <svg viewBox="0 0 24 24" className="w-14 h-14">
                  <path
                    d="M7 10V8a5 5 0 0 1 10 0v2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    fill="currentColor"
                  />
                </svg>
              }
              title="Order as Customer"
              desc="Browse local restaurants and get meals delivered fast."
              points={[
                "Discover thousands of local favorites",
                "Exclusive deals & promos",
                "Track delivery in real time",
              ]}
              ctaColor="bg-emerald-600 hover:bg-emerald-700"
            />

            {/* Driver */}
            <RoleCard
              navigateTo="/driver-on-board-step-1"
              tone="blue"
              badge={{ label: "Deliver" }}
              icon={
                <svg viewBox="0 0 24 24" className="w-14 h-14">
                  <circle cx="7" cy="17" r="3" fill="currentColor" />
                  <circle cx="17" cy="17" r="3" fill="currentColor" />
                  <path
                    d="M3 11h5l2 6h8a3 3 0 0 0 3-3v-4h-6l-2-3H9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              }
              title="Deliver as Driver"
              desc="Earn on your schedule by delivering with Uber."
              points={[
                "Set your own hours",
                "Get paid weekly",
                "In-app navigation & support",
              ]}
              ctaColor="bg-blue-600 hover:bg-blue-700"
            />

            {/* Owner */}
            <RoleCard
              navigateTo="/owner-on-board-step-1"
              tone="amber"
              badge={{ label: "Popular" }}
              icon={
                <svg viewBox="0 0 24 24" className="w-14 h-14">
                  <path
                    d="M3 10h18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M5 10V6h14v4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="9"
                    rx="2"
                    fill="currentColor"
                  />
                </svg>
              }
              title="Manage as Owner"
              desc="Connect your restaurant and start taking online orders."
              points={[
                "List your menu in minutes",
                "Manage orders & payouts",
                "Insights, ratings & reports",
              ]}
              ctaColor="bg-amber-500 hover:bg-amber-600"
            />
          </div>

          {/* Foot note / policy (optional, looks nice full-width) */}
          <div className="mt-10">
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
          </div>
        </div>
      </main>
    </div>
  );
}

/* ----- RoleCard (UI-only) ----- */

type RoleCardProps = {
  navigateTo: string;
  tone: "emerald" | "blue" | "amber";
  badge?: { label: string };
  icon: React.ReactNode;
  title: string;
  desc: string;
  points: string[]; // NEW: three bullet points
  ctaColor: string; // Tailwind classes for button color
};

function RoleCard({
  navigateTo,
  tone,
  badge,
  icon,
  title,
  desc,
  points,
  ctaColor,
}: RoleCardProps) {
  const toneMap: Record<
    RoleCardProps["tone"],
    {
      text: string;
      ring: string;
      chipBg: string;
      chipText: string;
      icon: string;
      check: string;
    }
  > = {
    emerald: {
      text: "text-emerald-700",
      ring: "ring-emerald-100",
      chipBg: "bg-emerald-50",
      chipText: "text-emerald-700",
      icon: "text-emerald-600",
      check: "text-emerald-600",
    },
    blue: {
      text: "text-blue-700",
      ring: "ring-blue-100",
      chipBg: "bg-blue-50",
      chipText: "text-blue-700",
      icon: "text-blue-600",
      check: "text-blue-600",
    },
    amber: {
      text: "text-amber-700",
      ring: "ring-amber-100",
      chipBg: "bg-amber-50",
      chipText: "text-amber-700",
      icon: "text-amber-500",
      check: "text-amber-500",
    },
  };

  const t = toneMap[tone];

  return (
    <article
      className={`
        group rounded-2xl bg-white
        ring-1 ring-black/10 ${t.ring}
        shadow-sm hover:shadow-md hover:ring-black/20
        transition
        p-7 lg:p-8 flex flex-col min-h-[380px] md:min-h-[420px]
      `}
    >
      <div className="flex items-start justify-between">
        {badge && (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${t.chipBg} ${t.chipText}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      <div className={`mt-4 ${t.icon}`}>{icon}</div>

      <h3 className="mt-4 text-xl md:text-2xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm md:text-base text-slate-600">{desc}</p>

      {/* Feature points */}
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg
              className={`mt-0.5 h-4 w-4 ${t.check}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      {/* Actions pinned to bottom */}
      <div className="mt-6 md:mt-8 flex items-center gap-3">
        <Link to={navigateTo}>
          <button
            type="button"
            className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white ${ctaColor} transition`}
          >
            Continue
          </button>
        </Link>

        <button
          type="button"
          className={`text-sm font-medium ${t.text} hover:underline`}
        >
          Learn more
        </button>
      </div>
    </article>
  );
}
