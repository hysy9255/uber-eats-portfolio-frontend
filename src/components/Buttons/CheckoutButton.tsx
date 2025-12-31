interface CheckoutButtonProps {
  onClick: () => void;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-purple-700 hover:bg-purple-800 active:bg-purple-900 
        hover:cursor-pointer rounded-md
        text-white text-sm font-medium py-3 w-full"
    >
      CHECKOUT
    </button>
  );
};

export default CheckoutButton;
