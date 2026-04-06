import GrayButtonUI from "./ButtonUI/GrayButtonUI";

interface CancelButtonProps {
  onClick: () => void;
  className?: string;
}
const CancelButton: React.FC<CancelButtonProps> = ({ onClick, className }) => {
  return (
    <GrayButtonUI buttonName="Cancel" onClick={onClick} className={className} />
  );
};

export default CancelButton;
