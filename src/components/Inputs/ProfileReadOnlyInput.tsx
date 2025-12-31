interface ProfileReadOnlyInputProps {
  value?: string;
}

const ProfileReadOnlyInput: React.FC<ProfileReadOnlyInputProps> = ({
  value,
}) => {
  return (
    <input
      className="border border-gray-300 rounded px-2 py-1 bg-gray-50 text-gray-700 focus:outline-none text-xs"
      readOnly
      value={value}
    />
  );
};

export default ProfileReadOnlyInput;
