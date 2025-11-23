import { Link } from "react-router-dom";

interface UberEatsLogoProps {
  navigatesTo: string;
}

const UberEatsLogo: React.FC<UberEatsLogoProps> = ({ navigatesTo }) => {
  return (
    <Link
      to={navigatesTo}
      className="select-none text-2xl font-semibold order-1 flex px-2"
    >
      <span>Uber</span>
      <span className="bg-gradient-to-tr from-blue-600  via-teal-400 to-emerald-300 bg-clip-text text-transparent">
        Eats
      </span>
    </Link>
  );
};

export default UberEatsLogo;
