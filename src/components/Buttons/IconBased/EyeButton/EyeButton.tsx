import EyeIcon from "./EyeIcon";

const EyeButton = () => {
  return (
    <button
      type="button"
      className="p-1.5 rounded-md hover:bg-gray-100"
      aria-label="Show password"
    >
      <EyeIcon />
    </button>
  );
};

export default EyeButton;
