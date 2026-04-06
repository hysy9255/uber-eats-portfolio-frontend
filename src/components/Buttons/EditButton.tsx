import BlueButtonUI from "./ButtonUI/BlueButtonUI";

interface EditButtonProps {
  onClick: () => void;
  className?: string;
  buttonName?: string;
}
const EditButton: React.FC<EditButtonProps> = ({
  onClick,
  className,
  buttonName = "Edit",
}) => {
  return (
    <BlueButtonUI
      buttonName={buttonName}
      onClick={onClick}
      className={className}
    />
  );
};

export default EditButton;
