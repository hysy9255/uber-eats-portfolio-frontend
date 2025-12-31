interface TitleCompProps {
  title: string;
}

const TitleComp: React.FC<TitleCompProps> = ({ title }) => {
  return <h1 className="font-semibold text-lg leading-none">{title}</h1>;
};

export default TitleComp;
