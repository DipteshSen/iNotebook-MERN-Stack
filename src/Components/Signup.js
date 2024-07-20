import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'


const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:"" })
  let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    /* console.log('Form submitted'); */
    let url = "http://localhost:5000/api/auth/createuser"
    const {name, email, password}=credentials;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Redirect to dashboard
      localStorage.setItem('token', json.authtoken);
      navigate('/');
      props.showAlert("Account created successfully","success")
    } else {
      props.showAlert("Invalid credentials","danger")

    }
  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container my-5 d-flex justify-content-center align-items-center'>
      <div className='glass col-lg-6'>
        <h1>Sign Up</h1>
        <form className='my-4' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" required onChange={onChange} className="form-control" id="name" name="name" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
            <div id="emailHelp" required className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" required onChange={onChange} className="form-control" id="password" name="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" onChange={onChange} className="form-control" id="cpassword" name="cpassword" />
          </div>

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
