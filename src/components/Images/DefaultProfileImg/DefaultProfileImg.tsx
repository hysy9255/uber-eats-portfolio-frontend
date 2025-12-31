import defaultProfileImg from "./defaultProfileImg.png";

interface DefaultProfileImgProps {
  className?: string;
}

const DefaultProfileImg: React.FC<DefaultProfileImgProps> = ({ className }) => {
  return <img src={defaultProfileImg} className={className} alt="Profile" />;
};

export default DefaultProfileImg;
