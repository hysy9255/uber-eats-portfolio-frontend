import docIconImg from "./docIcon.png";

interface DocIconProps {
  className?: string;
}

const DocIcon: React.FC<DocIconProps> = ({ className }) => {
  return <img className={className} src={docIconImg} />;
};

export default DocIcon;
