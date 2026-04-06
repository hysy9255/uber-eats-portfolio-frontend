import { useFormContext } from "react-hook-form";
import type { EditRestaurantInfoForm } from "../../formDataTypes/restaurant/editRestaurantInfoForm.type";

type FieldName = keyof EditRestaurantInfoForm;

interface RestaurantInfoInputProps {
  title: string;
  isEditing: boolean;
  fieldName: FieldName;
  isRequired?: boolean;
  className?: string;
  valueAsNumber?: boolean;
}

const RestaurantInfoInput: React.FC<RestaurantInfoInputProps> = ({
  title,
  isEditing,
  fieldName,
  isRequired = true,
  className,
  valueAsNumber = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[fieldName];

  const rules = {
    required: isRequired ? `${title} is required` : false,
    valueAsNumber: valueAsNumber,
  };

  const rulesForNumberInput = {
    ...rules,
    min: { value: 1, message: "Must be at least 1" },
  };

  return (
    <div className={`${className} space-y-1`}>
      <h2 className="text-sm text-gray-700">{title}</h2>
      {valueAsNumber ? (
        <input
          {...register(fieldName, rulesForNumberInput)}
          disabled={!isEditing}
          type="number"
          min={1}
          step={1}
          className={`border-1 ${
            isEditing
              ? "border-blue-300 text-gray-900"
              : "border-gray-300 text-gray-500"
          }  rounded-sm w-full text-sm py-1 px-2 outline-none transition duration-300`}
        />
      ) : (
        <input
          {...register(fieldName, rules)}
          disabled={!isEditing}
          className={`border-1 ${
            isEditing
              ? "border-blue-300 text-gray-900"
              : "border-gray-300 text-gray-500"
          }  rounded-sm w-full text-sm py-1 px-2 outline-none transition duration-300`}
        />
      )}
      {error?.message && (
        <span className="text-xs text-rose-600">{String(error.message)}</span>
      )}
    </div>
  );
};

export default RestaurantInfoInput;
