import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      id="outer"
      className="h-screen flex flex-col p-[clamp(5px,min(2vh,2vw),20px)]"
    >
      <div className="flex-1 bg-white flex items-center justify-center text-black text-center">
        <div>
          {/* Page Not Found Text */}
          <h1 className="text-4xl font-bold">Page not found</h1>
          <p className="text-gray-400 mt-2">
            We can't seem to find the page you are looking for.
          </p>

          {/* Buttons */}
          <div className="mt-11">
            <Link
              to="/"
              className="bg-green-400 text-white font-semibold px-6 py-3 rounded-full inline-block shadow-md hover:bg-green-500 active:bg-green-600"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
