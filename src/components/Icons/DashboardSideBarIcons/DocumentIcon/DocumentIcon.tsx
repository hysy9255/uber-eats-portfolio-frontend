import documentIcon from "./document.png";

interface DocumentIconProps {
  className?: string;
}

const DocumentIcon: React.FC<DocumentIconProps> = ({ className }) => {
  return <img src={documentIcon} className={className} />;
};

export default DocumentIcon;
