import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login.js';
import { Signup } from './components/Signup.js';
import { JobDashboard } from './components/JobDashboard.js';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ModalSample from './components/ModalSample.js'

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<JobDashboard />} />
            <Route path='/test' element={<ModalSample />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </>
  );
}

export default App;
