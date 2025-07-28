import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from "react";

// ✅ Zod Schema
const categorySchema = z.object({
  title: z.string().min(1, 'Category title is required'),
  image: z.any().refine((files) => !files || files.length === 0 || files[0] instanceof File, 'Invalid file'),
  isPublic: z.boolean().optional(),
});

function AddCategoryForm() {
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: '',
      image: null,
      isPublic: false,
    },
  });

  

  const onSubmit = async (data) => {
    

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('isPublic', data.isPublic ? 'true' : 'false');
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    setLoading(true);
    const res = await fetch('http://localhost:7000/categories/add', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();



    if (res.ok) {
      toast.success(result.message);
      reset();
      fileInputRef.current.value = "";
    } else {
      console.error('Server error:', result);
      toast.error(result.message);
    }

    setLoading(false);

  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  

  return (
    <div className="container mt-4">
      <h4>Add New Category</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded bg-secondary" enctype="multipart/form-data">

        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Category Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            {...register('title')}
            placeholder="Enter category title"
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="form-label">Category Image</label>
          <input
            type="file"
            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
            accept="image/*"
            {...register('image')}
            onChange={handleImageChange}
            ref={(e) => {
              register("image").ref(e);
              fileInputRef.current = e;
            }}
          />
          {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="img-thumbnail"
                style={{ maxHeight: '150px' }}
              />
            </div>
          )}
        </div>

        {/* Public Checkbox */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="isPublic"
            {...register('isPublic')}
          />
          <label className="form-check-label" htmlFor="isPublic">
            Public Category
          </label>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Saving...':'Add Category'} </button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </div>
  );
}

export default AddCategoryForm;
