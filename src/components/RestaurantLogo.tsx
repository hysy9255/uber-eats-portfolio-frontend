import LogoUpload from "./LogoUpload";
import TitleComp from "./TitleComp";

interface RestaurantLogoProps {
  className?: string;
}

const RestaurantLogo: React.FC<RestaurantLogoProps> = ({ className }) => {
  return (
    <div
      className={`${className} flex flex-col gap-y-3 border border-gray-300 rounded-md p-5`}
    >
      <div className="flex justify-between items-center h-[28px]">
        <TitleComp title="Restaurant Logo" />
      </div>
      <LogoUpload />
    </div>
  );
};

export default RestaurantLogo;
