import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';



function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message='YO HO HO HO HO HO' />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />

          </Routes>

        </Router>
      </NoteState>
    </>
  );
}

export default App;
