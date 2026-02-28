import cloudinary from '../config/cloudinary.js';
import Image from '../models/Image.js';
import Product from '../models/Product.js';
import streamifier from 'streamifier';
import mongoose from 'mongoose';

export const uploadImage = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'ecommerce',
        resource_type: 'image',
        transformation: [
          { fetch_format: 'auto', quality: 'auto' },
        ],
      },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: error.message });
        }
        const originalUrl = result.secure_url;
        const publicId = result.public_id;

        // generate variant URLs
        const thumbnailUrl = cloudinary.url(publicId, {
          width: 150,
          height: 150,
          crop: 'thumb',
          fetch_format: 'auto',
          quality: 'auto',
        });
        const mediumUrl = cloudinary.url(publicId, {
          width: 600,
          crop: 'scale',
          fetch_format: 'auto',
          quality: 'auto',
        });
        const largeUrl = cloudinary.url(publicId, {
          width: 1200,
          crop: 'scale',
          fetch_format: 'auto',
          quality: 'auto',
        });

        const imageData = { originalUrl, thumbnailUrl, mediumUrl, largeUrl };

        // Only save Image doc and update product if productId is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(productId) && productId !== 'temp') {
          try {
            // save image doc
            const imageDoc = await Image.create({
              ...imageData,
              product: productId,
            });

            // also push into product record
            await Product.findByIdAndUpdate(productId, {
              $push: {
                images: imageData,
              },
            });

            return res.status(201).json(imageDoc);
          } catch (dbErr) {
            console.error('Database error:', dbErr.message);
            // Still return the image URLs even if db save fails
            return res.status(201).json(imageData);
          }
        } else {
          // Return just the image URLs for now (product will be created without images)
          return res.status(201).json(imageData);
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (err) {
    console.error('Upload controller error:', err);
    res.status(500).json({ message: err.message });
  }
};

export const getImagesByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const images = await Image.find({ product: productId });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
