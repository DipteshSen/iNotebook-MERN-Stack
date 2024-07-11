import React,{useRef} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';




const Navbar = () => {
  let location = useLocation();
  let navigate=useNavigate();

  const closeNav = useRef(null);

  const handleClick=()=>{
    closeNav.current.click()
  }

  const handleLogOut=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      <nav className=" navbar navbar-expand-lg bg-body-tertiary">
        <div className=" container-fluid">
          <Link className="navbar-brand" to="/"><b>iNoteBook</b></Link>
          <button ref={closeNav} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link onClick={handleClick} className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link onClick={handleClick} className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
              </li>


            </ul>
            {!localStorage.getItem('token') ?
            <form className="d-flex">
              <Link onClick={handleClick} className="btn btn-outline-success" to='/login' type="button">Log in</Link>
              <Link onClick={handleClick} className="btn btn-outline-primary mx-3" to='/signup' type="submit">Sign Up</Link>
            </form>:<button onClick={handleLogOut} className="btn btn-outline-secondary" >Log Out</button>}

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
