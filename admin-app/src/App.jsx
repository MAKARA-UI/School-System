import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Student from "./components/student";
import Teacher from "./components/Teacher";
import Marks from "./components/Marks"; // 

function App() {
  return (
    <Router>
      {/* Routing Section */}
      <Routes>
        <Route path="/student" element={<Student />} /> {/* Display Student component */}
        <Route path="/teacher" element={<Teacher />} /> {/* Display Teacher component */}
        <Route path="/marks" element={<Marks />} /> {/* Display marks component */}
      </Routes>
    </Router>
  );
}

export default App;
