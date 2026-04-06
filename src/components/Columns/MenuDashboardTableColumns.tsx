interface MenuDashboardTableColumnsProps {
  tableColumnCss: string;
  className?: string;
}

const MenuDashboardTableColumns: React.FC<MenuDashboardTableColumnsProps> = ({
  tableColumnCss,
  className,
}) => {
  return (
    <div
      className={`${className} bg-stone-50 border border-gray-300 rounded-md text-sm font-semibold py-3 px-5 gap-3 grid ${tableColumnCss}`}
    >
      <div className="">Category</div>
      <div className="">Image</div>
      <div className="">Name</div>
      <div className="">Description</div>
      <div className="flex justify-end ">Price</div>
      <div className="flex justify-center ">Availability</div>
      <div className="">Actions</div>
    </div>
  );
};

export default MenuDashboardTableColumns;
