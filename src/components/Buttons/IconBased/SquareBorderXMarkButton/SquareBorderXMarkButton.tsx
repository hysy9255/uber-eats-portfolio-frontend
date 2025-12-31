import boxCloseIcon from "./box-close-icon.png";

interface SquareBorderXMarkButtonProps {
  buttonClassName?: string;
  imgClassName?: string;
  onClick: () => void;
}

const SquareBorderXMarkButton: React.FC<SquareBorderXMarkButtonProps> = ({
  buttonClassName,
  imgClassName,
  onClick,
}) => {
  return (
    <button className={buttonClassName} onClick={onClick}>
      <img className={imgClassName} src={boxCloseIcon} />
    </button>
  );
};

export default SquareBorderXMarkButton;
