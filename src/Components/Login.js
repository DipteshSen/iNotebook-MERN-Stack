import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    Link
} from 'react-router-dom'; 
const Login = (props) => {

    const [credentials,setCredentials]=useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        /* console.log('Form submitted'); */
        let url = "http://localhost:5000/api/auth/login"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        });
        const json = await response.json();
        console.log(json);

        if(json.success) {
            // Redirect to dashboard
            localStorage.setItem('token',json.authtoken);
            navigate('/');
            props.showAlert("Logged in successfully","success")
        }else {
            props.showAlert("Invalid credentials","danger")
      
          }
    }

    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div className='container my-5 d-flex justify-content-center align-items-center'>
            <div className='glass col-lg-6'>
                <h1>Login</h1>
                <form className='my-4' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" onChange={onChange} value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" onChange={onChange} value={credentials.password} className="form-control" id="password" name="password" />
                    </div>

                    <button className="btn btn-primary">Submit</button>
                </form>
                <p>Don't have an account ? <Link to='/signup'>Create one</Link></p>
            </div>
            
        </div>

    )
}

export default Login
