import noti from "../icons/newIcons/notification.png";

const AlarmHeader = () => {
  return (
    <div
      className="hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200
                 w-[40px] h-[40px] rounded-full flex items-center justify-center"
    >
      <img className="w-[24px] h-[24px]" src={noti}></img>
    </div>
  );
};

export default AlarmHeader;
