import BlueButtonUI from "../ButtonUI/BlueButtonUI";

interface SubmitButtonProps {
  onClick: () => void;
  buttonName: string;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  buttonName,
  className,
  onClick,
}) => {
  return (
    <BlueButtonUI
      buttonName={buttonName}
      className={className}
      onClick={onClick}
    />
  );
};

export default SubmitButton;
