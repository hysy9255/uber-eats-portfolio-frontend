interface KpiButtonProps {
  value: string;
  label: string;
  valueSize: string;
  labelSize: string;
  compHeight?: string;
}

const KpiButton: React.FC<KpiButtonProps> = ({
  value,
  label,
  valueSize,
  labelSize,
  compHeight,
}) => {
  return (
    <button
      className={`hover:bg-gray-100 hover:cursor-pointer
                 active:bg-gray-200 
                   border border-gray-300 
                   p-1
                 bg-white flex flex-col items-center justify-center rounded-lg shadow-md
                   ${compHeight}
                 `}
    >
      <div className={`font-semibold ${valueSize}`}>{value}</div>
      <div className={`text-gray-700 ${labelSize}`}>{label}</div>
    </button>
  );
};

export default KpiButton;
