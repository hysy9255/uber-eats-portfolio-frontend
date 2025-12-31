import noImgAvailable from "./no_imgae.png";

interface NoImgAvailableProps {
  className?: string;
}

const NoImgAvailable: React.FC<NoImgAvailableProps> = ({ className }) => {
  return <img className={`${className}`} src={noImgAvailable} />;
};

export default NoImgAvailable;
