import React, {useState} from 'react'

function Login() {

  // initial state for login form
  const [user, setUser] = useState({
    email:'',
    password:''
  })

  // initial state for signup form
  const [signUpUser, setSignUpUser] = useState({
    fullName:'',
    email:'',
    password:'',
    rPassword:'',
    image:null,
    phone:''
  })


  const [islogin, setIsLogin] = useState(true);



  const handleChange = (e)=>{
    const fieldname = e.target.name;
    setUser({...user, [fieldname]:e.target.value});
  }

  const handleSignUpChange = (e) => {
    const { name, value, type, files } = e.target;
    setSignUpUser((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };


  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(user);
  }


  const handleSignUpSubmit = (e)=>{
    e.preventDefault();

    const data = new FormData();
    data.append('fullName', signUpUser.fullName);
    data.append('email', signUpUser.email);
    data.append('password', signUpUser.password);
    data.append('phone', signUpUser.phone);
    data.append('image', signUpUser.image);

    for (let pair of data.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
  }
  


  const handleFormDisplay  =()=>{
    setIsLogin(!islogin);
  }

  return (
    <div className="container">
      <button className='btn btn-info me-2' onClick={handleFormDisplay}>Login Here</button>
      <button className='btn btn-outline-info' onClick={handleFormDisplay}>Signup Here</button>
      {
        islogin ? <div className="login-wrapper">
          <h1>Login Page</h1>
          <form className="row g-3 w-50 mt-4" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" onChange={handleChange} name="email" />
            </div>
            <div className="col-md-12">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" onChange={handleChange} name="password"/>
            </div>
            
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Sign in</button>
            </div>
          </form>
        </div>:
        <div className="signup-wrapper">
          <h1>Signup Page</h1>
          <form className="row g-3 w-50 mt-4" onSubmit={handleSignUpSubmit}>
            <div className="col-md-12">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input type="text" className="form-control" onChange={handleSignUpChange} value={signUpUser.fullName} name="fullName" />
            </div>
            <div className="col-md-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" onChange={handleSignUpChange} value={signUpUser.email} name="email" />
            </div>
            <div className="col-md-12">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" onChange={handleSignUpChange} value={signUpUser.password} name="password"/>
            </div>
            <div className="col-md-12">
              <label htmlFor="rpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" onChange={handleSignUpChange} value={signUpUser.rPassword} name="rPassword"/>
            </div>
            <div className="col-md-12">
              <label htmlFor="image" className="form-label">Upload Image</label>
              <input type="file" className="form-control" onChange={handleSignUpChange} name="image"/>
            </div>
            <div className="col-md-12">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="tel" className="form-control" onChange={handleSignUpChange} value={signUpUser.phone} name="phone"/>
            </div>
            
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      }
        
        
    </div>
  )
}

export default Login