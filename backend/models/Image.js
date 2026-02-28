import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },
  mediumUrl: {
    type: String,
  },
  largeUrl: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

export default mongoose.model('Image', imageSchema);
