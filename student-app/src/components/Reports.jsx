import { useState, useEffect } from 'react';
import { getReport } from '../api';
import "../styles/profile.css";

const Report = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    getReport().then(response => setReport(response.data));
  }, []);

  return (
    <div>
      <h1>Report</h1>
      <p>{report?.content}</p>
      <p>{new Date(report?.date).toLocaleDateString()}</p>
    </div>
  );
};

export default Report;
