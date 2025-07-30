import mongoose from 'mongoose';
import { type } from 'os';

const imageSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  secure_url: { type: String, required: true }
}, { _id: false });

const labelValueSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category:{ type:mongoose.Schema.Types.ObjectId},
  discountPrice: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  sku: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  videoLink: { type: String },
  longDescription: { type: String, required: true },

  size: [labelValueSchema], // Array of { label, value }
  color: [labelValueSchema], // Array of { label, value }

  mainImage: {
    type: imageSchema,
    required: true
  },

  galleryImages: {
    type: [imageSchema],
    default: []
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
