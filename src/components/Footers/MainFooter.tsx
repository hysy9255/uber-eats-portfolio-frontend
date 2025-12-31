import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { HeartIcon } from "../Icons/HeartIcon";
import { HomeIcon } from "../Icons/HomeIcon";
import { SearchIcon } from "../Icons/SearchIcon";
import { ReceiptIcon } from "../Icons/ReceiptIcon";
import { UserIcon } from "../Icons/UserIcon";

type Item = {
  to: string;
  label: string;
  icon: (active: boolean) => ReactNode;
  badge?: number; // e.g. for 주문내역 count
};

const cx = (...cls: (string | false | undefined)[]) =>
  cls.filter(Boolean).join(" ");

export default function MainFooter() {
  const items: Item[] = [
    { to: "/", label: "홈", icon: (a) => <HomeIcon active={a} /> },
    { to: "/search", label: "검색", icon: (a) => <SearchIcon active={a} /> },
    {
      to: "/favorites",
      label: "즐겨찾기",
      icon: (a) => <HeartIcon active={a} />,
    },
    {
      to: "/orders",
      label: "주문내역",
      icon: (a) => <ReceiptIcon active={a} />,
      badge: 2,
    },
    { to: "/me", label: "마이", icon: (a) => <UserIcon active={a} /> },
  ];

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
      <ul className="mx-auto grid max-w-screen-sm grid-cols-5 px-2 pt-2 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
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
