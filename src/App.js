import './App.css';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';



function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert} />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
            <Route exact path='/signup' element={<Signup showAlert={showAlert}/>} />

          </Routes>
          <div className='container'>
            <br />
          </div>

        </Router>
      </NoteState>
    </>
  );
}

export default App;
