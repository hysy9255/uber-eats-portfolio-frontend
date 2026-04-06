import { ClientSideBarTabTypes } from "../../../constants/ClientSideBarTabEnums";
import { useCart } from "../../../ReactContext/cart/UseCart";

interface ClientSidebarTabProps {
  title: string;
  handleOnClick: () => void;
  tabType?: ClientSideBarTabTypes;
  selectedTab?: ClientSideBarTabTypes;
  extraPaddingOnLeft?: boolean;
  icon?: React.ReactNode;
}

const ClientSidebarTab: React.FC<ClientSidebarTabProps> = ({
  tabType,
  title,
  handleOnClick,
  selectedTab,
  extraPaddingOnLeft = false,
  icon,
}) => {
  const { cart } = useCart();
  const cartItemsNumber = cart.cartItems.length;

  const baseCss = `hover:cursor-pointer ${
    tabType && "hover:bg-gray-100"
  } rounded-md ${extraPaddingOnLeft ? "pl-15" : "pl-3"}  py-2 `;
  const notSelectedCss = `${baseCss} text-gray-700 active:bg-gray-200`;
  const selectedCss = `${baseCss} bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 active:bg-gray-300`;

  return (
    <div
      onClick={handleOnClick}
      className={
        tabType && selectedTab === tabType ? selectedCss : notSelectedCss
      }
    >
      <div className="flex gap-x-4">
        {icon}
        <div className="flex gap-x-1">
          <div>{title}</div>
          {title === "Cart" && cartItemsNumber > 0 && (
            <div>({cartItemsNumber})</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientSidebarTab;
