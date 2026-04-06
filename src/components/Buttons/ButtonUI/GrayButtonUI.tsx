type GrayButtonUIProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonName: string;
  className?: string;
};

const GrayButtonUI: React.FC<GrayButtonUIProps> = ({
  buttonName,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`leading-none font-semibold text-sm
    bg-gray-100 text-gray-500 px-2 rounded-sm 
    hover:cursor-pointer
    border border-gray-400 
    hover:bg-gray-200 active:bg-gray-300 ${className}`}
    >
      {buttonName}
    </button>
  );
};

export default GrayButtonUI;
