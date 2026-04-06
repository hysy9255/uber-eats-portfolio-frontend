interface OnBoardHeadlineProps {
  title: string;
  subtitle?: string;
}

const OnBoardHeadline: React.FC<OnBoardHeadlineProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="mt-6">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        {title}
      </h1>
      {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
    </div>
  );
};

export default OnBoardHeadline;
