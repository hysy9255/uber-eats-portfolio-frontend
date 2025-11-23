interface ActionDropdownProps {
  onClickDelete: () => void;
  onClickEdit: () => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <div
      className={`flex flex-col 
    p-3 border border-gray-100 
    shadow-md bg-white
    absolute
    z-50
    rounded-md
    
    `}
    >
      <div className="hover:underline" onClick={onClickEdit}>
        Edit
      </div>
      <div className="text-red-700 hover:underline" onClick={onClickDelete}>
        Delete
      </div>
    </div>
  );
};

export default ActionDropdown;
