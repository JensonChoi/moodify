import Navbar from'./components/Navbar';
import Home from'./components/Home';
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
        </Routes>
      </div>
     </Router>
    </div>
  );
}

export default App;
