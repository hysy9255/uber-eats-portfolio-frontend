import noImgAvailable from "./no_imgae.png";

interface NoImgAvailableProps {
  className?: string;
  onlyText?: boolean;
}

const NoImgAvailable: React.FC<NoImgAvailableProps> = ({
  className,
  onlyText,
}) => {
  if (onlyText) {
    return (
      <div className=" p-1 text-gray font-semibold flex items-center justify-center border border-gray-300 rounded-md aspect-4/3">
        No Image
      </div>
    );
  } else {
    return <img className={`${className}`} src={noImgAvailable} />;
  }
};

export default NoImgAvailable;
