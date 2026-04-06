import type { DraftItem } from "../formDataTypes/onBoarding/ownerOnBoardingForms.type";
import ImageUploadZoneSmall from "./UploadZones/ImageUploadZoneSmall";

interface DraftMenuItemsProps {
  onRemove: (i: number) => void;
  onSelectSmallImageUpload: (index: number, file: File) => void;
  fields: DraftItem[];
}

const DraftMenuItems: React.FC<DraftMenuItemsProps> = ({
  onRemove,
  onSelectSmallImageUpload,
  fields,
}) => {
  return (
    <div className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">Draft items</h3>
      </div>

      {fields.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">
          No items yet. Use “Add an item” below or import from CSV (optional).
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((f, index) => {
            const item = f;
            return (
              <li
                key={index}
                className="flex gap-3 items-center rounded-lg ring-1 ring-slate-200 p-3"
              >
                {item.imagePreview ? (
                  <img
                    src={item.imagePreview}
                    alt={item.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                ) : (
                  <ImageUploadZoneSmall
                    index={index}
                    className="h-16 w-16 rounded-md"
                    onSelected={onSelectSmallImageUpload}
                  />
                )}
                <div className="min-w-0">
                  <div className="font-medium truncate">{item.name}</div>
                  <div className="text-sm text-slate-600">
                    {item.category} · ${Number(item.price).toFixed(2)}
                  </div>
                  {item.description && (
                    <div className="text-xs text-slate-500 truncate">
                      {item.description}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="ml-auto rounded-full px-2 py-1 text-xs ring-1 ring-slate-300 hover:bg-slate-50 hover:cursor-pointer"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DraftMenuItems;
