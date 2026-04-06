import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { HeartIcon } from "../Icons/MobileFooterIcons/HeartIcon";
import { HomeIcon } from "../Icons/MobileFooterIcons/HomeIcon";
import { ReceiptIcon } from "../Icons/MobileFooterIcons/ReceiptIcon";
import { UserIcon } from "../Icons/MobileFooterIcons/UserIcon";
import { useAuth } from "../../ReactContext/auth/UseAuth";

type Item = {
  to: string;
  label: string;
  icon: (active: boolean) => ReactNode;
  badge?: number;
};

const cx = (...cls: (string | false | undefined)[]) =>
  cls.filter(Boolean).join(" ");

export default function MainFooter() {
  const { loggedIn } = useAuth();

  const items: Item[] = [
    { to: "/", label: "Home", icon: (a) => <HomeIcon active={a} /> },
    {
      to: "/favorites",
      label: "Favorites",
      icon: (a) => <HeartIcon active={a} />,
    },
    {
      to: "/orders",
      label: "History",
      icon: (a) => <ReceiptIcon active={a} />,
      badge: 2,
    },
    { to: "/profile", label: "Profile", icon: (a) => <UserIcon active={a} /> },
  ];

  if (!loggedIn) return null;

  return (
    <nav
      className={cx(
        "block sm:hidden",
        "fixed inset-x-0 bottom-0 z-50",
        " bg-white",
        "shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      )}
      role="navigation"
      aria-label="Bottom navigation"
    >
      <ul className="mx-auto grid max-w-screen-sm grid-cols-4 px-2 pt-2 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
        {items.map((item) => (
          <li key={item.to} className="flex items-stretch justify-center">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cx(
                  "group relative flex flex-col items-center gap-1 rounded-md px-3 py-1.5",
                  "text-xs font-medium leading-4 transition",
                  isActive
                    ? "text-black"
                    : "text-slate-500 hover:text-slate-700"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">{item.icon(isActive)}</span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
