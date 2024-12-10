import { useState, useEffect } from 'react';
import { getRecords } from '../api';
import "../styles/profile.css";

const Records = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRecords().then(response => setRecords(response.data));
  }, []);

  return (
    <div>
      <h1>Records</h1>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            {record.description} - {record.grade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Records;
