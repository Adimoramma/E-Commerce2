import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary expects cloud_name, api_key, and api_secret
// Parse from CLOUDINARY_URL: cloudinary://api_key:api_secret@cloud_name
const cloudinaryUrl = process.env.CLOUDINARY_URL;

if (cloudinaryUrl) {
  const url = new URL(cloudinaryUrl);
  const cloudName = url.hostname;
  const apiKey = url.username;
  const apiSecret = url.password;

  cloudinary.v2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
  console.log('Cloudinary configured with cloud_name:', cloudName);
} else {
  console.error('CLOUDINARY_URL environment variable is not set');
}

export default cloudinary.v2;
