import { uploadImage } from "./utils/uploadImg";

const UploadBasic = () => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }

    const uploadedUrl = await uploadImage(file);
    console.log(uploadedUrl);
  };
  return (
    <div>
      <div>
        <input type="file" accept="image/*" onChange={handleChange} />
      </div>
    </div>
  );
};

export default UploadBasic;
