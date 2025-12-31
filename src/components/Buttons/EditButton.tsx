interface EditButtonProps {
  onClick: () => void;
  className?: string;
}
const EditButton: React.FC<EditButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`leading-none font-semibold text-sm
        bg-blue-100 text-blue-500 px-2 rounded-sm 
        border border-blue-400 
        hover:bg-blue-200 active:bg-blue-300 ${className}`}
    >
      Edit
    </button>
  );
};

export default EditButton;
