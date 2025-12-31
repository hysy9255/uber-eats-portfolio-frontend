interface DownChevronProps {
  w?: string;
  h?: string;
}

const DownChevron: React.FC<DownChevronProps> = ({ w = "w-5", h = "h-5" }) => {
  return (
    <span className="text-gray-600">
      <svg
        className={`${w} ${h}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};

export default DownChevron;
