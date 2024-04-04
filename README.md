### File upload component
![image](https://github.com/ManishBisht777/file-vault/assets/89926834/777ab136-0a9f-4657-b098-d4fb680b9608)

### Cloudinary upload helper function

```
 const fileUploadBatch = acceptedFiles.map((file) => {
       const formData = new FormData();
       formData.append("file", file);
       formData.append(
         "upload_preset",
         process.env.NEXT_PUBLIC_UPLOAD_PRESET as string
       );

       const cancelSource = axios.CancelToken.source();
       return uploadImageToCloudinary(
         formData,
         (progressEvent) => onUploadProgress(progressEvent, file, cancelSource),
         cancelSource
       );
     });

     try {
       await Promise.all(fileUploadBatch);
       alert("All files uploaded successfully");
     } catch (error) {
       console.error("Error uploading files: ", error);
     }
```
