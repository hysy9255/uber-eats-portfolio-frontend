import type { ReactNode } from "react";

interface OnBoardDescriptionProps {
  description: ReactNode;
}

const OnBoardDescription: React.FC<OnBoardDescriptionProps> = ({
  description,
}) => {
  return (
    <div className="h-fit mt-8 rounded-2xl bg-white/80 backdrop-blur ring-1 ring-black/10 p-5">
      {description}
    </div>
  );
};

export default OnBoardDescription;
