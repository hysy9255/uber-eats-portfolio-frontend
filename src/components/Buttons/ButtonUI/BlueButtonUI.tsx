type BlueButtonUIProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonName: string;
  className?: string;
};

const BlueButtonUI: React.FC<BlueButtonUIProps> = ({
  buttonName,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`leading-none font-semibold text-sm
    bg-sky-100 text-blue-400 px-2 rounded-sm 
    hover:cursor-pointer
    border border-sky-400 
    hover:bg-blue-200 active:bg-blue-300 ${className}`}
    >
      {buttonName}
    </button>
  );
};

export default BlueButtonUI;
