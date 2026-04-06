import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const OnBoardLayout = () => {
  const layoutWidth = "max-w-[900px] mx-auto";
  return (
    <Fragment>
      <main
        className={`${layoutWidth} px-6 lg:px-10 flex flex-col justify-center`}
      >
        <Outlet />
      </main>
    </Fragment>
  );
};

export default OnBoardLayout;
