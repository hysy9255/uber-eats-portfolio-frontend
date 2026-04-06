import {
  useFormContext,
  type Path,
  get,
  type FieldValues,
} from "react-hook-form";
import { customInputCss } from "../../constants/CustomInputCss";

interface OnBoardInputProps<TForm extends FieldValues> {
  css: string;
  title: string;
  field: Path<TForm>;
  placeholder?: string;
  pattern?: { value: RegExp; message: string };
  children?: React.ReactNode;
  customMessageFunction?: () => React.ReactNode;
  type?: string;
  validateValue?: string;
  validationMessage?: string;
}

const OnBoardInput = <TForm extends FieldValues>({
  css,
  title,
  field,
  placeholder,
  pattern,
  validateValue,
  validationMessage,
  children,
  customMessageFunction,
  type,
}: OnBoardInputProps<TForm>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TForm>();
  const error = get(errors, field);

  return (
    <label className={css}>
      <div className="text-sm font-medium">{title}</div>
      <div className="flex gap-x-2">
        <input
          {...register(field, {
            required: `${title} is required`,
            setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
            ...(pattern && { pattern }),
            ...(validateValue && {
              validate: (val) => val === validateValue || validationMessage,
            }),
          })}
          className={customInputCss}
          placeholder={placeholder}
          type={type}
        />
        {children}
      </div>
      {error?.message && (
        <div className="font-medium text-red-500 text-xs">{error.message}</div>
      )}
      {customMessageFunction?.()}
    </label>
  );
};

export default OnBoardInput;
