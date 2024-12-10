import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Profile from './components/Profile';
import Records from './components/Records';
import Report from './components/Report';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 style={{ textAlign: "center" }}>Student Application</h1>
        <h5>
          <Link to="/profile">Go to Profile page</Link>
        </h5>
        <h5>
          <Link to="/records">Go to Records page</Link>
        </h5>
        <h5>
          <Link to="/report">Go to Report page</Link>
        </h5>

        {/* Routing Section */}
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/records" element={<Records />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
