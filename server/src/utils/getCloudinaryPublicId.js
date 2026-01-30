const getPublicIdFromUrl = (url) => {
    if (!url) return null;
  
    try {
      // Remove query params
      const cleanUrl = url.split("?")[0];
  
      // Decode %20 etc.
      const decodedUrl = decodeURIComponent(cleanUrl);
  
      // Get everything after /upload/
      const uploadIndex = decodedUrl.indexOf("/upload/");
      if (uploadIndex === -1) return null;
  
      let pathAfterUpload = decodedUrl.slice(uploadIndex + 8);
  
      // Remove version folder (v123456/)
      pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, "");
  
      // Remove ONLY the final file extension (.jpg, .png, etc)
      // but keep inner `.jpeg`
      const publicId = pathAfterUpload.replace(/\.(jpg|png|webp|gif)$/i, "");
  
      return publicId;
    } catch {
      return null;
    }
  };
  
  export default getPublicIdFromUrl;
  