import CancelButton from "../../Buttons/CancelButton";
import RoundBorderXMarkButton from "../../Buttons/IconBased/RoundBorderXMarkButton/RoundBorderXMarkButton";
import FormIdBasedSubmitButton from "../../Buttons/SubmitButton/FormIdBasedSubmitButton";

interface ProfilePageModalShellProps {
  children: React.ReactNode;
  onClickClose: () => void;
  saveButtonName: string;
  formId: string;
}

const ProfilePageModalShell: React.FC<ProfilePageModalShellProps> = ({
  children,
  onClickClose,
  saveButtonName,
  formId,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-100 h-100 rounded-md flex flex-col justify-center items-center gap-y-6 relative">
        <RoundBorderXMarkButton
          onClick={onClickClose}
          className="absolute top-2 right-2 
      border-gray-300 hover:bg-gray-100 active:bg-gray-200"
        />
        {children}
        <div className="flex gap-3">
          <CancelButton
            onClick={onClickClose}
            className="px-2 py-2 rounded-full"
          />
          <FormIdBasedSubmitButton
            buttonName={saveButtonName}
            className="px-2 py-2 rounded-full"
            formId={formId}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageModalShell;
