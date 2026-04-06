import BlueButtonUI from "../ButtonUI/BlueButtonUI";

interface FormIdBasedSubmitButtonProps {
  buttonName: string;
  formId: string;
  className?: string;
}

const FormIdBasedSubmitButton: React.FC<FormIdBasedSubmitButtonProps> = ({
  buttonName,
  formId,
  className,
}) => {
  return (
    <BlueButtonUI
      form={formId}
      type="submit"
      buttonName={buttonName}
      className={className}
    />
  );
};

export default FormIdBasedSubmitButton;
