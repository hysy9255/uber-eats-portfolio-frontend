import { XMarkIcon } from "../Buttons/IconBased/RoundBorderXMarkButton/XMarkIcon";

interface LogoUploadPopUpProps {
  preview?: string;
  openFilePicker: () => void;
  saveLogo: () => void;
  closePopUp: () => void;
  fileSelected: boolean;
}

const LogoUploadPopUp: React.FC<LogoUploadPopUpProps> = ({
  preview,
  openFilePicker,
  saveLogo,
  closePopUp,
  fileSelected,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-400 flex items-center justify-center">
      <div className="bg-white mx-auto rounded-sm p-10 relative flex flex-col items-center gap-5">
        <div className="border-2 border-gray-300 w-[200px] h-[200px] flex items-center justify-center rounded-full overflow-hidden">
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" />
          ) : (
            <div className="text-xs text-gray-500">No Logo Image</div>
          )}
        </div>
        {fileSelected ? (
          <button
            onClick={saveLogo}
            className="border border-gray-300 w-full font-semibold text-gray-600 rounded-sm hover:cursor-pointer bg-gray-100 hover:bg-gray-200/50 active:bg-gray-200/80 text-xs p-3 "
          >
            Save
          </button>
        ) : (
          <button
            onClick={openFilePicker}
            className="border border-gray-300 w-full font-semibold text-gray-600 rounded-sm hover:cursor-pointer bg-gray-100 hover:bg-gray-200/50 active:bg-gray-200/80 text-xs p-3 "
          >
            Upload from Device
          </button>
        )}

        {/* <button
          onClick={saveLogo}
          className="border border-gray-300 text-gray-600 rounded-sm hover:cursor-pointer bg-gray-100 hover:bg-gray-200/50 active:bg-gray-200/80 text-xs p-3 "
        >
          Save
        </button>

        <button
          onClick={openFilePicker}
          className="border border-gray-300 text-gray-600 rounded-sm hover:cursor-pointer bg-gray-100 hover:bg-gray-200/50 active:bg-gray-200/80 text-xs p-3 "
        >
          Upload from Device
        </button> */}

        <div
          onClick={closePopUp}
          className="rounded-full absolute top-2 right-2 w-7 h-7 hover:cursor-pointer hover:bg-gray-200/50 active:bg-gray-200/80 flex items-center justify-center"
        >
          <XMarkIcon className="text-gray-500 w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default LogoUploadPopUp;
