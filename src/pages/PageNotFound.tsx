import { Link } from "react-router-dom";
import { useAuth } from "../ReactContext/auth/UseAuth";
import { UserRole } from "../constants/UserRoleEnum";
const PageNotFound = () => {
  const { user } = useAuth();

  const backTo =
    user?.role === UserRole.Client
      ? "/client/restaurants"
      : user?.role === UserRole.Owner
      ? "/dashboard/overview"
      : "/";

  const buttonText =
    user?.role === UserRole.Client
      ? "Back to restaurants"
      : user?.role === UserRole.Owner
      ? "Back to dashboard"
      : "Go to home";

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="text-gray-400 mt-2">
        We can't seem to find the page you are looking for.
      </p>

      {user && user.role === UserRole.Client && (
        <div className="mt-11">
          <Link
            to={backTo}
            className="bg-green-400 text-white font-semibold px-6 py-3 rounded-full inline-block shadow-md hover:bg-green-500 active:bg-green-600"
          >
            {buttonText}
          </Link>
        </div>
      )}

      {user && user.role === UserRole.Owner && (
        <div className="mt-11">
          <Link
            to="/dashboard/overview"
            className="bg-green-400 text-white font-semibold px-6 py-3 rounded-full inline-block shadow-md hover:bg-green-500 active:bg-green-600"
          >
            Back to dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default PageNotFound;
