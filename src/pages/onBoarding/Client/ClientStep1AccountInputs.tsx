import { Fragment } from "react/jsx-runtime";
import ProfileOrLogoUploadZone from "../../../components/UploadZones/ProfileOrLogoUploadZone";
import OnBoardInput from "../../../components/Inputs/OnBoardInput";
import DefaultProfileImg from "../../../components/Images/DefaultProfileImg/DefaultProfileImg";
import { emailValidationMessage } from "../../../utils/emailValidationMessage";
import type { EmailCheck } from "../../../constants/EmailCheck.type";

interface ClientStep1AccountInputsProps {
  onClickRemoveProfile: () => void;
  onClickUploadProfile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickCheckEmailAvailability: () => void;
  showEmailCheckMessage: boolean;
  profileImgPreview?: string;
  pwd?: string;
  emailCheck: EmailCheck;
}

const ClientStep1AccountInputs: React.FC<ClientStep1AccountInputsProps> = ({
  onClickRemoveProfile,
  onClickUploadProfile,
  handleClickCheckEmailAvailability,
  showEmailCheckMessage,
  profileImgPreview,
  pwd,
  emailCheck,
}) => {
  return (
    <Fragment>
      <ProfileOrLogoUploadZone
        onClickRemove={onClickRemoveProfile}
        onClickUpload={onClickUploadProfile}
        title="Profile photo"
        defaultImgBackground={
          <DefaultProfileImg className="w-52 border rounded-full" />
        }
        profileImgPreview={profileImgPreview}
      />
      <OnBoardInput
        css="col-span-1"
        title="First name"
        field="step1.firstName"
        placeholder="Jane"
      />
      <OnBoardInput
        css="col-span-1"
        title="Last name"
        field="step1.lastName"
        placeholder="Doe"
      />
      <OnBoardInput
        css="col-span-2"
        title="Phone number"
        field="step1.phoneNumber"
        placeholder="xxx-xxxx-xxxx"
        pattern={{
          value: /^010-\d{4}-\d{4}$/,
          message: "Use xxx-xxxx-xxxx format",
        }}
      />
      <OnBoardInput
        css="col-span-2"
        title="Email"
        field="step1.email"
        placeholder="you@example.com"
        pattern={{
          value:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Please enter valid email",
        }}
        children={
          <button
            onClick={handleClickCheckEmailAvailability}
            type="button"
            className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-white font-semibold rounded-md text-nowrap px-3 py-1 hover:cursor-pointer text-xs"
          >
            Check for availability
          </button>
        }
        customMessageFunction={() =>
          emailValidationMessage(emailCheck, showEmailCheckMessage)
        }
      />
      <OnBoardInput
        css="block col-span-2 md:col-span-1"
        title="Password"
        field="step1.password"
        placeholder="••••••••"
        type="password"
      />
      <OnBoardInput
        css="block col-span-2 md:col-span-1"
        title="Confirm Password"
        field="step1.confirmPassword"
        placeholder="••••••••"
        type="password"
        validateValue={pwd}
        validationMessage="Passwords do not match"
      />
    </Fragment>
  );
};

export default ClientStep1AccountInputs;
