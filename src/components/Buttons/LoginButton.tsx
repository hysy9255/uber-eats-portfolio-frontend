import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link to={"/login"}>
      <div className="hover:underline text-sm text-slate-900">Log in</div>
    </Link>
  );
};

export default LoginButton;
