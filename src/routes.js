import {Routes,Route} from 'react-router-dom';
import Login from './components/UserLogin/Login';
import Employee from './components/Employee/Employee';
import Dashboard from './components/Admin/Dashboard';

const Routing = [
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/employee' element={<Employee/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
]

export default Routing;