import cartIcon from "../icons/newIcons/shopping-bag.png";

const CartHeader = () => {
  return (
    // <div className="hover:cursor-pointer">
    //   <img className="w-10 h-10" src={cartIcon}></img>
    // </div>
    <div
      className="hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200
                 w-[40px] h-[40px] rounded-full flex items-center justify-center"
    >
      <img className="w-[24px] h-[24px]" src={cartIcon}></img>
    </div>
  );
};

export default CartHeader;
