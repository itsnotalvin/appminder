import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login.js';
import { Signup } from './components/Signup.js';
import { JobDashboard } from './components/JobDashboard.js';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import ModalSample from './components/ModalSample.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<JobDashboard id={1} />} />
          <Route path='/test' element={<ModalSample />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
