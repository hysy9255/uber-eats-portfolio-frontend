interface DashboardActionButtonProps {
  label: string;
  labelSize: string;
  compHeight?: string;
}

const DashboardActionButton: React.FC<DashboardActionButtonProps> = ({
  label,
  labelSize,
  compHeight,
}) => {
  return (
    <button
      className={`
        ${compHeight} ${labelSize}
      hover:bg-gray-100 hover:cursor-pointer active:bg-gray-200
      bg-white shadow-md 
        text-center font-medium text-gray-700
        flex items-center justify-center
        border border-gray-300 rounded-md`}
    >
      {label}
    </button>
  );
};

export default DashboardActionButton;
