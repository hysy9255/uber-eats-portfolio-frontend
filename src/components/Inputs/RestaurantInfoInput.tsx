import { useFormContext } from "react-hook-form";
import type { RestaurantInfoEditForm } from "../RestaurantInfoEditor";

type FieldName = keyof RestaurantInfoEditForm;

interface RestaurantInfoInputProps {
  title: string;
  isEditing: boolean;
  fieldName: FieldName;
  isRequired?: boolean;
  className?: string;
}

const RestaurantInfoInput: React.FC<RestaurantInfoInputProps> = ({
  title,
  isEditing,
  fieldName,
  isRequired = true,
  className,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[fieldName];
  const rules = isRequired ? { required: `${title} is required` } : {};

  return (
    <div className={`${className} space-y-1`}>
      <h2 className="text-sm text-gray-700">{title}</h2>
      <input
        {...register(fieldName, rules)}
        disabled={!isEditing}
        className={`border-1 ${
          isEditing
            ? "border-blue-300 text-gray-900"
            : "border-gray-300 text-gray-500"
        }  rounded-sm w-full text-sm py-1 px-2 outline-none transition duration-300`}
        // defaultValue={value ?? ""}
      />
      {error?.message && (
        <span className="text-xs text-rose-600">{String(error.message)}</span>
      )}
    </div>
  );
};

export default RestaurantInfoInput;
