import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../hook/usePost";

// Zod schema for validation
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });


  const {postData, response, error, loading} = usePost('http://localhost:7000/users/signin');


  console.log(error);
  

  const onSubmit = async (data) => {
    await postData(data);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password")}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-3 w-100">
          Sign In
        </button>
      </form>
    </div>
  );
}
