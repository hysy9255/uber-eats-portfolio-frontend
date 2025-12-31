interface RoundCheckBoxProps {
  isChecked: boolean;
}

const RoundCheckBox: React.FC<RoundCheckBoxProps> = ({ isChecked }) => {
  return (
    <>
      {isChecked ? (
        <div className="w-5 h-5 bg-sky-400 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      ) : (
        <div className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
        </div>
      )}
    </>
  );
};

export default RoundCheckBox;
