import React, { useState, useEffect } from 'react';
import WorkshopForm from './WorkshopForm';
import '../styles/WorkshopTable.css';

const WorkshopTable = () => {
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/workshops');
        const data = await response.json();
        setWorkshops(data);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    };
  
    fetchWorkshops();
  }, []);
  

  const handleAddClick = () => {
    setSelectedWorkshop(null); // Clear the selected workshop for adding
    setShowForm(true);
  };

  const handleUpdateClick = (workshop) => {
    setSelectedWorkshop(workshop); // Select a workshop for editing
    setShowForm(true);
  };

  const handleDeleteClick = async (workshopId) => {
    await fetch(`http://localhost:5000/api/workshops/${workshopId}`, {
      method: 'DELETE',
    });
    setWorkshops((prev) => prev.filter((workshop) => workshop._id !== workshopId));
  };
  

  const handleSaveWorkshop = async (workshop) => {
    if (workshop._id) {
      // Update an existing workshop
      const response = await fetch(`http://localhost:5000/api/workshops/${workshop._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workshop),
      });
      const updatedWorkshop = await response.json();
      setWorkshops((prev) =>
        prev.map((w) => (w._id === updatedWorkshop._id ? updatedWorkshop : w))
      );
    } else {
      // Add a new workshop
      const response = await fetch('http://localhost:5000/api/workshops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workshop),
      });
      const newWorkshop = await response.json();
      setWorkshops((prev) => [...prev, newWorkshop]);
    }
    setShowForm(false);
  };
  

  return (
    <div>
      <h2>Workshop Management</h2>
      <button
        className="add"
        onClick={handleAddClick}
        style={{ backgroundColor: 'blue', color: 'white' }}
      >
        Add Workshop
      </button>
      {workshops.length === 0 ? (
        <p>No workshops available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Date</th>
              <th>Teacher ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((workshop) => (
              <tr key={workshop._id}>
                <td>{workshop.topic}</td>
                <td>{new Date(workshop.date).toLocaleDateString()}</td>
                <td>{workshop.teacherId}</td>
                <td>
                  <button
                    className="update"
                    onClick={() => handleUpdateClick(workshop)}
                    style={{ backgroundColor: 'green', color: 'white' }}
                  >
                    Update
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDeleteClick(workshop._id)}
                    style={{ backgroundColor: 'red', color: 'white' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <WorkshopForm
          workshop={selectedWorkshop}
          onClose={() => setShowForm(false)}
          onSave={handleSaveWorkshop}
        />
      )}
    </div>
  );
};

export default WorkshopTable;
