import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Dropzone from 'react-dropzone';
import { MultiSelect } from 'react-multi-select-component';

import TiptapEditor from '../components/TipTap/TiptapEditor';

const sizeOptions = [
  { label: 'Small', value: 'S' },
  { label: 'Medium', value: 'M' },
  { label: 'Large', value: 'L' },
];

const colorOptions = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Black', value: 'black' },
];

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(5, 'Description too short'),
  price: z.number().positive('Price must be positive'),
  discountPrice: z.number().nonnegative('Discount must be zero or more').optional(),
  stock: z.number().int().nonnegative('Stock must be 0 or more'),
  sku: z.string().min(1, 'SKU is required'),
  category: z.string().min(1, 'Category is required'),
  slug: z.string().min(1, 'Slug is required'),
  videoLink: z.string().url('Enter a valid video URL').optional(),
  mainImage: z
    .any()
    .refine((file) => file instanceof FileList && file.length === 1, 'Main image is required'), galleryImages: z.any()
    .refine((files) => Array.isArray(files) && files.length > 0, 'Gallery images required'),
  size: z.array(z.object({ label: z.string(), value: z.string() })).nonempty('Select at least one size'),
  color: z.array(z.object({ label: z.string(), value: z.string() })).nonempty('Select at least one color'),
  longDescription: z.string().min(10, 'Long description is required'),
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
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [longDesc, setLongDesc] = useState('');
  const [categories, setCategories] = useState([])

  // Sync size, color, and longDescription with hook form
  useEffect(() => {
    register('longDescription');
    register('size');
    register('color');
  }, [register]);

  useEffect(() => {
    setValue('longDescription', longDesc);
  }, [longDesc, setValue]);

  useEffect(() => {
    setValue('size', selectedSizes);
  }, [selectedSizes, setValue]);

  useEffect(() => {
    setValue('color', selectedColors);
  }, [selectedColors, setValue]);


  useEffect(()=>{
    const getAllCategories = async ()=>{
      const response = await fetch('http://localhost:7000/categories');
      const data = await response.json();
      setCategories(data);
    }
    getAllCategories();
  },[])

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('discountPrice', data.discountPrice || '');
    formData.append('stock', data.stock);
    formData.append('sku', data.sku);
    formData.append('slug', data.slug);
    formData.append('videoLink', data.videoLink || '');
    formData.append('category', data.category);
    formData.append('longDescription', data.longDescription);

    formData.append('mainImage', data.mainImage[0]);


    galleryFiles.forEach((file) => {
      formData.append('galleryImages', file);
    });

    formData.append('size', JSON.stringify(data.size));
    formData.append('color', JSON.stringify(data.color));



    const res = await fetch('http://localhost:7000/products/add', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();

    console.log("result", result);
    

    console.log('Submitting:', Object.fromEntries(formData.entries()));
    alert('Submitted! Check console');
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    setValue('mainImage', e.target.files);
    if (file) setMainPreview(URL.createObjectURL(file));
  };

  const handleDrop = (acceptedFiles) => {
    const previews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setGalleryPreviews(previews);
    setGalleryFiles(acceptedFiles);
    setValue('galleryImages', acceptedFiles);
  };

  const removeGalleryImage = (index) => {
    const newFiles = [...galleryFiles];
    const newPreviews = [...galleryPreviews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setGalleryFiles(newFiles);
    setGalleryPreviews(newPreviews);
    setValue('galleryImages', newFiles);
  };

  return (
    <form className="container bg-secondary my-5 p-5" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <h3>Add Product</h3>

      {/* Title */}
      <div className="mb-3">
        <label className="form-label">Product Title</label>
        <input type="text" className="form-control" {...register('title')} />
        {errors.title && <div className="text-danger">{errors.title.message}</div>}
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label">Short Description</label>
        <textarea className="form-control" rows={3} {...register('description')} />
        {errors.description && <div className="text-danger">{errors.description.message}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select className="form-select" {...register('category')}>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
        {errors.category && <div className="text-danger">{errors.category.message}</div>}
      </div>

      {/* Price */}
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input type="number" className="form-control" {...register('price', { valueAsNumber: true })} />
        {errors.price && <div className="text-danger">{errors.price.message}</div>}
      </div>

      {/* Discount Price */}
      <div className="mb-3">
        <label className="form-label">Discount Price</label>
        <input type="number" className="form-control" {...register('discountPrice', { valueAsNumber: true })} />
        {errors.discountPrice && <div className="text-danger">{errors.discountPrice.message}</div>}
      </div>

      {/* Stock */}
      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input type="number" className="form-control" {...register('stock', { valueAsNumber: true })} />
        {errors.stock && <div className="text-danger">{errors.stock.message}</div>}
      </div>

      {/* SKU */}
      <div className="mb-3">
        <label className="form-label">SKU</label>
        <input type="text" className="form-control" {...register('sku')} />
        {errors.sku && <div className="text-danger">{errors.sku.message}</div>}
      </div>

      {/* Slug */}
      <div className="mb-3">
        <label className="form-label">Slug</label>
        <input type="text" className="form-control" {...register('slug')} />
        {errors.slug && <div className="text-danger">{errors.slug.message}</div>}
      </div>

      {/* Video Link */}
      <div className="mb-3">
        <label className="form-label">Video Link (optional)</label>
        <input type="text" className="form-control" {...register('videoLink')} />
        {errors.videoLink && <div className="text-danger">{errors.videoLink.message}</div>}
      </div>

      {/* Long Description with TipTap */}
      <div className="mb-3">
        <label className="form-label">Long Description</label>
        <TiptapEditor initialContent="" setDescription={setLongDesc} />
        {errors.longDescription && <div className="text-danger mt-1">{errors.longDescription.message}</div>}
      </div>

      {/* Size */}
      <div className="mb-3">
        <label className="form-label">Size</label>
        <MultiSelect options={sizeOptions} value={selectedSizes} onChange={setSelectedSizes} labelledBy="Select Size" />
        {errors.size && <div className="text-danger">{errors.size.message}</div>}
      </div>

      {/* Color */}
      <div className="mb-3">
        <label className="form-label">Color</label>
        <MultiSelect options={colorOptions} value={selectedColors} onChange={setSelectedColors} labelledBy="Select Color" />
        {errors.color && <div className="text-danger">{errors.color.message}</div>}
      </div>

      {/* Main Image */}
      <div className="mb-3">
        <label className="form-label">Main Image</label>
        <input type="file" accept="image/*" className="form-control" onChange={handleMainImageChange} />
        {errors.mainImage && <div className="text-danger">{errors.mainImage.message}</div>}
        {mainPreview && <img src={mainPreview} alt="Main" height="100" className="mt-2" />}
      </div>

      {/* Gallery Images Dropzone */}
      <div className="mb-3">
        <label className="form-label">Gallery Images</label>
        <Dropzone onDrop={handleDrop} accept={{ 'image/*': [] }} multiple>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="border border-secondary p-4 text-center rounded">
              <input {...getInputProps()} />
              <p>Drag & Drop or Click to Browse</p>
            </div>
          )}
        </Dropzone>
        {errors.galleryImages && <div className="text-danger">{errors.galleryImages.message}</div>}
        <div className="d-flex flex-wrap gap-2 mt-2">
          {galleryPreviews.map((src, i) => (
            <div key={i} className="position-relative">
              <img src={src} alt={`Gallery ${i}`} height="80" className="border" />
              <button type="button" className="btn btn-sm btn-danger position-absolute top-0 end-0" onClick={() => removeGalleryImage(i)}>×</button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Submit Product</button>
    </form>
  );
}
