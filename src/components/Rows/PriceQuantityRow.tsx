import type { ReactNode } from "react";

interface PriceQuantityRowProps {
  children: ReactNode;
}

const PriceQuantityRow: React.FC<PriceQuantityRowProps> = ({ children }) => {
  return (
    <div
      className="
            h-10
            ring ring-gray-100
            text-sm font-semibold rounded-md 
            shadow-md py-2 px-3 
            flex justify-between items-center"
    >
      {children}
    </div>
  );
};

export default PriceQuantityRow;
