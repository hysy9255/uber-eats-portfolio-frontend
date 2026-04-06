import loginBannerImg from "./loginBanner.png";

interface LogInBannerImgProps {
  className?: string;
}

const LogInBannerImg: React.FC<LogInBannerImgProps> = ({ className }) => {
  return (
    <div
      className={className}
      style={{ backgroundImage: `url(${loginBannerImg})` }}
    />
  );
};

export default LogInBannerImg;
