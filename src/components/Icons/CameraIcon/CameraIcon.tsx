import cameraImg from "./camera.png";

interface CameraIconProps {
  className?: string;
}

const CameraIcon: React.FC<CameraIconProps> = ({ className }) => {
  return <img src={cameraImg} className={className} />;
};

export default CameraIcon;
