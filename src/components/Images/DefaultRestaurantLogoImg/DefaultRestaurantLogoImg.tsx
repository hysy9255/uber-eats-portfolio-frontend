import defaultRestaurantLogoImg from "./defaultRestaurantLogo.jpg";

interface DefaultRestaurantLogoImgProps {
  className?: string;
}

const DefaultRestaurantLogoImg: React.FC<DefaultRestaurantLogoImgProps> = ({
  className,
}) => {
  return <img src={defaultRestaurantLogoImg} className={className} />;
};

export default DefaultRestaurantLogoImg;
