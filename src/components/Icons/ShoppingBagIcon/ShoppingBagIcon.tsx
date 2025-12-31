import shoppingBag from "./shopping-bag.png";

interface ShoppingBagIconProps {
  children: React.ReactNode;
  className?: string;
}

const ShoppingBagIcon: React.FC<ShoppingBagIconProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={className}
      style={{ backgroundImage: `url(${shoppingBag})` }}
    >
      {children}
    </div>
  );
};

export default ShoppingBagIcon;
