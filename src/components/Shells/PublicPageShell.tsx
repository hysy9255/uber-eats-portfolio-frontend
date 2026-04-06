import { Outlet } from "react-router-dom";
import PublicLayout from "../Layout/PublicLayout";

const PublicPageShell = () => {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

export default PublicPageShell;
