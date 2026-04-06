import profilePageBanner from "./profilePageBanner.png";

interface ProfilePageBannerProps {
  className?: string;
}

const ProfilePageBanner: React.FC<ProfilePageBannerProps> = ({ className }) => {
  return <img src={profilePageBanner} className={className} />;
};

export default ProfilePageBanner;
