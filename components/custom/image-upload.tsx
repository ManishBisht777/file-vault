import { UploadCloud } from "lucide-react";
import { Input } from "../ui/input";

export default function ImageUpload() {
  return (
    <div>
      <label
        htmlFor="dropzone-file"
        className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className=" text-center">
          <div className=" border p-2 rounded-md max-w-min mx-auto">
            <UploadCloud size={20} />
          </div>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Drag files</span>
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-400">
            Click to upload files &#40;files should be under 10 MB &#41;
          </p>
        </div>
      </label>

      <Input
        id="dropzone-file"
        accept="image/png, image/jpeg"
        type="file"
        className="hidden"
      />
    </div>
  );
}
