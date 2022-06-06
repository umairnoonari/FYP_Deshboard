import './App.css';
import Login from './components/Login';
import Deshboard from './components/Deshboard'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import User from './components/User';
import Community from './components/Community';
import Activity from './components/Activity';
import Trainer from './components/Trainer';
import Home from './components/Home'

function App() {
  return (
    <>
    <Router>  
    {/* <Deshboard /> */}
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/home" element={<Deshboard/>}>
        <Route index element={<Home />}></Route>
        <Route path="trainer" element={<Trainer />}></Route>
        <Route path="user" element={<User />}></Route>
        <Route path="community" element={<Community />}></Route>
        <Route path="activity" element={<Activity />}></Route>
        </Route>
      </Routes>
      
    </Router>
      {/* <Login /> */}
    </>
  );
}

export default App;
