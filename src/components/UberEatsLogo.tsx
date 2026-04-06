import { Link } from "react-router-dom";
import { useAuth } from "../ReactContext/auth/UseAuth";
import { UserRole } from "../constants/UserRoleEnum";

const UberEatsLogo = () => {
  const { user } = useAuth();

  const directTo =
    user.role === UserRole.Client
      ? "/client/restaurants"
      : user.role === UserRole.Owner
      ? "/dashboard/overview"
      : "/";

  return (
    <Link
      to={directTo}
      className="select-none text-2xl font-semibold order-1 flex"
    >
      <span>Uber</span>
      <span className="bg-gradient-to-tr from-blue-600  via-teal-400 to-emerald-300 bg-clip-text text-transparent">
        Eats
      </span>
    </Link>
  );
};

export default UberEatsLogo;
