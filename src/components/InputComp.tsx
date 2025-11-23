interface InputCompProps {
  title: string;
  values?: string;
  borderOn: string;
}

const InputComp: React.FC<InputCompProps> = ({ title, values, borderOn }) => {
  return (
    <div className={`${borderOn} space-y-1`}>
      <h2 className="text-lg text-gray-700">{title}</h2>
      <input
        className="border border-gray-300 rounded-sm w-full py-1 px-2"
        defaultValue={values}
      ></input>
    </div>
  );
};

export default InputComp;
