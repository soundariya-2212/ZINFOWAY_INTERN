import React from 'react';
import {Routes,Route} from 'react-router-dom'
import User from './Pages/User'
import Adduser from './Pages/Adduser';
import Edituser from './Pages/Edituser';
import Login from './Pages/Loginuser';
import Attendance from './Pages/Attenfancemark';
import CustomPage from './Pages/panel';
import CollegeCalendar from './Pages/Calendar';
import Front from './Pages/Front';
import AdminPage from './Pages/paneladmin';
import StaffPage from './Pages/panelstaff';
import StudentPage from './Pages/panelstudent';
// import CustomPage from './Pages/panel';
// import CustomPage from './Pages/panel';
// import Reg from './components/REGFIN2';
const App = () => {
  return (
    <>
    {/* <Reg/> */}
    <Routes>
      <Route path='/' element={<Front/>}/>
      <Route path='/add' element={<Adduser/>}/>
      <Route path='/edit/:id' element={<Edituser/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/paneladmin' element={<AdminPage/>}/>
      <Route path='/panelstaff' element={<StaffPage/>}/>
      <Route path='/panelstudent' element={<StudentPage/>}/>
    </Routes>
    </>

    //  <div>
    //   {/* <Attendance/> */}
    //   <CustomPage/>
    //  {/* <CollegeCalendar/> */}
    //  </div>
  );
};

export default App;
