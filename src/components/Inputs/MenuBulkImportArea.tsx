import type { DraftItem } from "../../formDataTypes/onBoarding/ownerOnBoardingForms.type";
import CsvUploadzone from "../UploadZones/CsvUploadZone";

interface MenuBulkImportAreaProps {
  onCsvUploaded?: (result: DraftItem[]) => void;
}

const MenuBulkImportArea: React.FC<MenuBulkImportAreaProps> = ({
  onCsvUploaded,
}) => {
  return (
    <div className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Bulk import</h3>
      </div>
      <CsvUploadzone mode="append" onUploaded={onCsvUploaded} />
    </div>
  );
};

export default MenuBulkImportArea;
