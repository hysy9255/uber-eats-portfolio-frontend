interface CategoryButtonProps {
  category: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category }) => {
  return (
    <div
      className="px-3 py-1
        text-slate-500  
        border border-slate-500
        bg-white
        text-sm font-semibold
        rounded-md  
        hover:cursor-pointer"
    >
      {category}
    </div>
  );
};

export default CategoryButton;
