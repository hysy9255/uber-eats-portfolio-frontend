interface OnBoardStepsProps {
  steps: string[];
  active: number;
}

const OnBoardSteps: React.FC<OnBoardStepsProps> = ({ steps, active }) => {
  return (
    <div className="z-30 bg-gray-50 py-4 -mx-6 lg:-mx-10">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-4 flex items-center justify-between gap-3">
        <ol className="flex flex-wrap items-center gap-4 text-sm">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full border text-[12px] ${
                  i <= active
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-slate-500 border-slate-300"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`${
                  i <= active ? "text-slate-900" : "text-slate-500"
                }`}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <span className="mx-2 h-px w-8 bg-slate-200" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default OnBoardSteps;
