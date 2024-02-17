"use client";

import { File, FileImage, FileText, UploadCloud, X } from "lucide-react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ProgressBar from "../ui/progress";

export default function ImageUpload() {
  // const uploadImageToCloudinary = async (
  //   formData: FormData,
  //   onUploadProgress: (progressEvent: ProgressEvent) => void
  // ) => {
  //   const response = await fetch(
  //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
  //     {
  //       method: "POST",
  //       body: formData,
  //     },
  //     onprogress: onUploadProgress
  //   );

  //   return response;
  // };

  const imageUpload = (image: File) => {
    console.log(image);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className=" text-center">
            <div className=" border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} />
            </div>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Drag files</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Click to upload files &#40;files should be under 10 MB &#41;
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
        />
      </div>

      <div>
        <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
          Uploaded Files
        </p>
        <ScrollArea className="h-40">
          <div className="space-y-2 pr-3">
            <div className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2">
              <div className="flex items-center flex-1 p-2">
                <FileImage className="text-white fill-purple-600" size={40} />
                <div className="w-full ml-2 space-y-1">
                  <div className="text-sm flex justify-between">
                    <p className="text-muted-foreground ">ImageName.png</p>
                    <span className="text-xs">56%</span>
                  </div>
                  <ProgressBar progress={56} />
                </div>
              </div>
              <div className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex">
                <X size={20} />
              </div>
            </div>
            <div className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2">
              <div className="flex items-center flex-1 p-2">
                <File className="text-white fill-yellow-400" size={40} />
                <div className="w-full ml-2 space-y-1">
                  <div className="text-sm flex justify-between">
                    <p className="text-muted-foreground ">ImageName.png</p>
                    <span className="text-xs">56%</span>
                  </div>
                  <ProgressBar className="bg-yellow-300" progress={56} />
                </div>
              </div>
              <div className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex">
                <X size={20} />
              </div>
            </div>
            <div className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2">
              <div className="flex items-center flex-1 p-2">
                <FileText className="text-white fill-blue-600" size={40} />
                <div className="w-full ml-2 space-y-1">
                  <div className="text-sm flex justify-between">
                    <p className="text-muted-foreground ">ImageName.png</p>
                    <span className="text-xs">56%</span>
                  </div>
                  <ProgressBar className="bg-blue-600" progress={56} />
                </div>
              </div>
              <div className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex">
                <X size={20} />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
