// import RestaurantInfoInput from "./components/Inputs/RestaurantInfoInput";
import LogoUpload from "./components/LogoUpload";

const LogoPractice = () => {
  return (
    <div className="border min-h-[calc(100vh-60px)] border-blue-400">
      <div className="border font-semibold text-gray-800">
        Restaurant Profile
      </div>
      <article className="grid grid-cols-4 gap-3">
        <LogoUpload />
        <div className="border col-span-3">sdjfkj</div>
      </article>
    </div>
  );
};

export default LogoPractice;
