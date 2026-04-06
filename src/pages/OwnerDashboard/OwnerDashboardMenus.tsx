import { useEffect } from "react";
import DeleteThisMenuPopup from "../../components/PopUps/DeleteThisMenuPopup";
import AddMenuSidebar from "../../components/SideBars/AddMenuSidebar"; // type CreateDishFormData,
import EditMenuSidebar from "../../components/EditMenuSidebar";
import { useMenus } from "../../ReactContext/ownerDashboardMenus/UseMenus";
import MenuDashboardHeader from "../../components/Headers/OwnerDashboard/MenuDashboardHeader";
import MenusTableForOwners from "../../components/Tables/MenusTableForOwners";

const OwnerDashboardMenus = () => {
  const {
    loadMenus,
    showConfirmDelete,
    editMenuSidebarOpen,
    addMenuSidebarOpen,
  } = useMenus();

  useEffect(() => {
    loadMenus();
  }, [loadMenus]);

  return (
    <main className="p-2 flex flex-col gap-[10px] h-[calc(100vh-60px)]">
      <MenuDashboardHeader />
      <MenusTableForOwners className="flex-1 overflow-y-auto" />
      {showConfirmDelete && <DeleteThisMenuPopup />}
      {addMenuSidebarOpen && <AddMenuSidebar />}
      {editMenuSidebarOpen && <EditMenuSidebar />}
    </main>
  );
};

export default OwnerDashboardMenus;
