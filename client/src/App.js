import logo from './logo.svg';
import './App.css';
import { Login }from './components/Login.js';
import { Signup } from './components/Signup.js';

function App() {
  return (
    <div className="App">
      <h1>This is a portfolio website</h1>
      <h2>Body</h2>
      <Login />
      <Signup />
    </div>
  );
}

export default App;
