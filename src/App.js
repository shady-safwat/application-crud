import './App.css';
import AddUser from './components/addUser/AddUser';
import Navbar from './components/navbar/Navbar';
import ReadUser from './components/readUser/ReadUser';
import UpdateUser from './components/updateUser/UpdateUser';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          {/* <Navbar/> */}
          <Navbar add="/" read='/read' />
          <Outlet/>
        </div>

        <div className='container'>
          <div className='d-flex align-items-center justify-content-center'>
            <Routes>
              <Route exact path='/' element={<AddUser />}/>
              <Route exact path='/read' element={<ReadUser />}/>
              <Route exact path='/edit/:id' element={<UpdateUser />}/>
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
