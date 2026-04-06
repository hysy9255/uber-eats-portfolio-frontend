import { downloadDishCsvTemplate } from "../../api/draftApi";

const DownloadCsvButton = () => {
  return (
    <button
      className="border border-gray-400 text-gray-700 rounded-full px-3 py-1 hover:cursor-pointer hover:bg-gray-100"
      onClick={() => downloadDishCsvTemplate()}
    >
      Download CSV template
    </button>
  );
};

export default DownloadCsvButton;
