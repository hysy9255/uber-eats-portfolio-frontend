import React from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link to={"/login"}>
      <a className="hover:underline text-sm text-slate-900">Log in</a>
    </Link>
  );
};

export default LoginButton;
