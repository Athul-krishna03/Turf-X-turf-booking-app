import axios from "axios";

export const uploadProfileImageCloudinary = async (file:File):Promise<string | null> => {
    const CLOUDINARY_CLOUD_PRESET =import.meta.env.VITE_CLOUDINARY_PROFILE_UPLOAD_PRESET;
    const CLOUDINARY_CLOUD_NAME  = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    if(!CLOUDINARY_CLOUD_PRESET || !CLOUDINARY_CLOUD_NAME){
        console.error("Cloudinary api missing");
        return null
    }

    const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset",CLOUDINARY_CLOUD_PRESET);

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,formData);

        if(response.status === 200){
            return response.data.secure_url;
        }else{
            console.error("Cloudinary upload failed:",response.data);
            return null
        }
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return null;
    }
}