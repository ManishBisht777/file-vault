"use client";

import { File, FileImage, FileText, UploadCloud, X } from "lucide-react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ProgressBar from "../ui/progress";
import axios, { AxiosProgressEvent } from "axios";
import { cn } from "@/lib/utils";
interface FileUploadProgress {
  progress: number;
  File: File;
}

export default function ImageUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);

  const getFileIconAndColor = (file: File) => {
    if (file.type.includes("image")) {
      return {
        icon: <FileImage size={40} className="fill-purple-600" />,
        color: "purple-600",
      };
    } else if (file.type.includes("pdf")) {
      return {
        icon: <FileText size={40} className="fill-blue-400" />,
        color: "blue-400",
      };
    } else {
      return {
        icon: <File size={40} className="bg-yellow-400" />,
        color: "yellow-400",
      };
    }
  };

  // feel free to use these function to separate utils
  // here is just for simplicity
  const onUploadProgress = (progressEvent: any, file: File) => {
    const progress = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100
    );

    if (progress === 100) {
      setUploadedFiles((prevUploadedFiles) => {
        return [...prevUploadedFiles, file];
      });

      setFilesToUpload((prevUploadProgress) => {
        return prevUploadProgress.filter((item) => item.File !== file);
      });

      return;
    }

    const updatedFiles = filesToUpload.filter((item) => item.File !== file);

    setFilesToUpload((prevUploadProgress) => {
      return [
        ...updatedFiles,
        {
          progress,
          File: file,
        },
      ];
    });
  };

  const uploadImageToCloudinary = async (
    formData: FormData,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
  ) => {
    return axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      formData,
      {
        onUploadProgress,
      }
    );
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const fileUploadBatch = acceptedFiles.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_UPLOAD_PRESET as string
      );

      return uploadImageToCloudinary(formData, (progressEvent) =>
        onUploadProgress(progressEvent, file)
      );
    });

    try {
      await Promise.all(fileUploadBatch);
      alert("All files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files: ", error);
      alert("Error uploading files");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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

      {filesToUpload.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              Files to upload
            </p>
            <div className="space-y-2 pr-3">
              {filesToUpload.map((fileUploadProgress) => {
                return (
                  <div
                    key={fileUploadProgress.File.lastModified}
                    className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                  >
                    <div className="flex items-center flex-1 p-2">
                      <div className="text-white">
                        {getFileIconAndColor(fileUploadProgress.File).icon}
                      </div>

                      <div className="w-full ml-2 space-y-1">
                        <div className="text-sm flex justify-between">
                          <p className="text-muted-foreground ">
                            {fileUploadProgress.File.name.slice(0, 25)}
                          </p>
                          <span className="text-xs">
                            {fileUploadProgress.progress}%
                          </span>
                        </div>
                        <ProgressBar
                          progress={fileUploadProgress.progress}
                          className={`bg-${
                            getFileIconAndColor(fileUploadProgress.File).color
                          }`}
                        />
                      </div>
                    </div>
                    <div className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex">
                      <X size={20} />
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Uploaded Files
          </p>
          <div className="space-y-2 pr-3">
            {uploadedFiles.map((fileUploadProgress) => {
              return (
                <div
                  key={fileUploadProgress.lastModified}
                  className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                >
                  <div className="flex items-center flex-1 p-2">
                    <div className="text-white">
                      {getFileIconAndColor(fileUploadProgress).icon}
                    </div>
                    <div className="w-full ml-2 space-y-1">
                      <div className="text-sm flex justify-between">
                        <p className="text-muted-foreground ">
                          {fileUploadProgress.name.slice(0, 25)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex">
                    <X size={20} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
