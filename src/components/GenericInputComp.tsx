import { useFormContext, type FieldValues, type Path } from "react-hook-form";

interface GenericInputCompProps<TFormValues extends FieldValues> {
  title: string;
  values?: string;
  borderOn: string;
  isEditing: boolean;
  fieldName: Path<TFormValues>;
  isRequired?: boolean;
}

const GenericInputComp = <TFormValues extends FieldValues>({
  title,
  values,
  borderOn,
  isEditing,
  fieldName,
  isRequired = true,
}: GenericInputCompProps<TFormValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const error = errors[fieldName];

  const rules = isRequired ? { required: `${title} is required` } : {};

  return (
    <div className={`${borderOn} space-y-1`}>
      <h2 className="text-sm text-gray-700">{title}</h2>
      {isEditing ? (
        <>
          <input
            {...register(fieldName, rules)}
            className="ring-2 ring-blue-300 rounded-sm w-full text-sm py-1 px-2"
            defaultValue={values}
          />
          {error?.message && (
            <span className="text-xs text-rose-600">
              {String(error.message)}
            </span>
          )}
        </>
      ) : (
        <div className="text-sm ring ring-gray-300 rounded-sm py-1 px-2">
          {values}
        </div>
      )}
    </div>
  );
};

export default GenericInputComp;
