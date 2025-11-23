import { Link } from "react-router-dom";

const HelpHeader = () => {
  return (
    <nav aria-label="Primary" className="flex items-center gap-4 text-sm">
      <Link to="/login" className="hover:underline">
        help
      </Link>
    </nav>
  );
};

export default HelpHeader;
