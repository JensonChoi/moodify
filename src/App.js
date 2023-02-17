import logo from './logo.svg';
import Navbar from'./components/Navbar';
import Home from'./components/Home';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="App">
     <Router>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
