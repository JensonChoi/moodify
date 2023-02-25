import Navbar from'./components/Navbar';
import Home from'./pages/Home';
import About from './pages/About';
import Generate from './pages/Generate';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
     <Router>

      <Navbar />
      <div className='container'>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/generate' element={<Generate/>} />
          <Route exact path='/about' element={<About/>} />
        </Routes>
      </div>
     </Router>
    </div>
  );
}

export default App;
