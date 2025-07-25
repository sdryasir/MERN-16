import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// ✅ Zod Schema
const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(5, 'Description too short'),
  price: z.number().positive('Price must be positive'),
  mainImage: z.any().refine((file) => file instanceof FileList && file.length === 1, 'Main image is required'),
  galleryImages: z.any().refine((files) => files instanceof FileList && files.length > 0, 'Gallery images are required'),
});

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [mainPreview, setMainPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);

    formData.append('mainImage', data.mainImage[0]);
    for (let i = 0; i < data.galleryImages.length; i++) {
      formData.append('galleryImages', data.galleryImages[i]);
    }

    console.log('Submitting:', Object.fromEntries(formData));
    alert('Submitted! (Check console)')
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    setValue('mainImage', e.target.files);
    if (file) setMainPreview(URL.createObjectURL(file));
  };

  const handleGalleryDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setValue('galleryImages', files);
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setGalleryPreviews(previews);
  };

  const handleGalleryBrowse = (e) => {
    const files = e.target.files;
    setValue('galleryImages', files);
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setGalleryPreviews(previews);
  };

  return (
    <form className="container my-5" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <h3>Add Product</h3>

      {/* Title */}
      <div className="mb-3">
        <label className="form-label">Product Title</label>
        <input type="text" className="form-control" {...register('title')} />
        {errors.title && <div className="text-danger">{errors.title.message}</div>}
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" rows={3} {...register('description')} />
        {errors.description && <div className="text-danger">{errors.description.message}</div>}
      </div>

      {/* Price */}
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input type="number" className="form-control" {...register('price', { valueAsNumber: true })} />
        {errors.price && <div className="text-danger">{errors.price.message}</div>}
      </div>

      {/* Main Image Upload */}
      <div className="mb-3">
        <label className="form-label">Main Image</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleMainImageChange}
        />
        {errors.mainImage && <div className="text-danger">{errors.mainImage.message}</div>}
        {mainPreview && (
          <div className="mt-2">
            <img src={mainPreview} alt="Main Preview" height="100" />
          </div>
        )}
      </div>

      {/* Gallery Image Dropzone */}
      <div className="mb-3">
        <label className="form-label">Gallery Images</label>
        <div
          className="border border-secondary rounded p-4 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleGalleryDrop}
        >
          Drag & Drop Gallery Images Here
          <br />
          <small className="text-muted">or click below to browse</small>
          <input
            type="file"
            multiple
            accept="image/*"
            className="form-control mt-2"
            onChange={handleGalleryBrowse}
          />
        </div>
        {errors.galleryImages && <div className="text-danger mt-1">{errors.galleryImages.message}</div>}
        {galleryPreviews.length > 0 && (
          <div className="mt-3 d-flex flex-wrap gap-2">
            {galleryPreviews.map((src, i) => (
              <img key={i} src={src} alt={`Gallery ${i}`} style={{ height: '80px', border: '1px solid #ccc' }} />
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">Submit Product</button>
    </form>
  );
}
