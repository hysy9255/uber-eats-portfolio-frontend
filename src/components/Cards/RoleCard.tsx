/* ----- RoleCard (UI-only) ----- */

import { Link } from "react-router-dom";

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

export default function RoleCard({
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
          shadow-sm
          p-7 flex flex-col min-h-[380px] md:min-h-[420px]
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
      <div className="mt-6 flex items-center gap-3">
        <Link to={navigateTo}>
          <button
            type="button"
            className={`
              rounded-full px-5 py-2.5 
              text-sm font-semibold text-white ${ctaColor} 
              transition hover:cursor-pointer`}
          >
            Continue
          </button>
        </Link>

        <button
          type="button"
          className={`text-sm font-medium ${t.text} hover:underline hover:cursor-pointer`}
        >
          Learn more
        </button>
      </div>
    </article>
  );
}
