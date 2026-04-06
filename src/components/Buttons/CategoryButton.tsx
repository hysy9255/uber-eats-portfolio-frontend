interface CategoryButtonProps {
  category: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category }) => {
  return (
    <div
      className="px-3 py-1
        text-black/80  
        bg-gray-200/60
        text-sm font-semibold
        rounded-md  
        hover:cursor-pointer"
    >
      {category}
    </div>
  );
};

export default CategoryButton;
