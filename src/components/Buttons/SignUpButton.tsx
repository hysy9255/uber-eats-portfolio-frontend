import { Link } from "react-router-dom";

const SignUpButton = () => {
  return (
    <nav className="flex items-center shrink-0">
      <Link to={"/create-account-choice"}>
        <div
          className="ml-1 rounded-full px-3 py-1.5 text-sm font-medium bg-black text-white"
          // href="#"
        >
          Sign up
        </div>
      </Link>
    </nav>
  );
};

export default SignUpButton;
