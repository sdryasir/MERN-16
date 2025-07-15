import React from 'react'
import * as z from "zod/v4"; 
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from 'react-hook-form'

function Contact() {


    const ContactSchema = z.object({
        name:z.string().max(15, "Name should be 15 charaters long").min(3, "pleae enter atleast 3 characters"),
        email:z.email("Please enter a valid email"),
        message:z.string().max(100, "Too long message, make it less than 100 chars")
    });
    const {register, handleSubmit, watch, formState: { errors, touchedFields }} = useForm({
      resolver: zodResolver(ContactSchema),
      mode: "onBlur",
    })

    

    const onSubmit = (data) => console.log(data)


  return (
    <div className='container'>
        <form className="row g-3 w-50 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-12">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" {...register("name", {required:true})} name="name" />
              {/* {errors.name && <span style={{color:'red'}}>This field is required</span>} */}
              {touchedFields.name && errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
            </div>
            <div className="col-md-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="text" className="form-control" {...register("email", { required: true })} name="email" />
              {touchedFields.email && errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </div>
            <div className="col-md-12">
              <label htmlFor="message" className="form-label">Message</label>
              <div class="form-floating">
                <textarea class="form-control" name='message' {...register("message", { required: true })} placeholder="Leave a comment here" id="floatingTextarea2" style={{height:'100px'}}></textarea>
                <label for="floatingTextarea2">Comments</label>
                {touchedFields.message && errors.message && <p style={{ color: "red" }}>{errors.message.message}</p>}
               </div>
            </div>
             
            
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
    </div>
  )
}

export default Contact