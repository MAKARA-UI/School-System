import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorkshopTable from './components/WorkshopTable';
import Announcements from './components/Announcements';
import TeacherProfile from './components/TeacherProfile';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1 style={{textAlign: "center"}}>Teacher Application</h1>
        <h5>Type "/teacher" to navigate to TeacherProfile page </h5>
        <h5>Type "/workshops" to navigate to WorkshopsTable page </h5>
        <h5>Type "/announcements" to navigate to Announcements page </h5>
  
        <Routes>
          <Route path="/teacher" element={<TeacherProfile />} />
          <Route path="/workshops" element={<WorkshopTable />} />
          <Route path="/announcements" element={<Announcements />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
