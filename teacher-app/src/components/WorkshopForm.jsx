import React, { useState, useEffect } from 'react';
import '../styles/WorkshopForm.css';

const WorkshopForm = ({ workshop, onClose, onSave }) => {
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [teacherId, setTeacherId] = useState('');

  useEffect(() => {
    if (workshop) {
      setTopic(workshop.topic || '');
      setDate(workshop.date || '');
      setTeacherId(workshop.teacherId || '');
    } else {
      setTopic('');
      setDate('');
      setTeacherId('');
    }
  }, [workshop]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedWorkshop = {
      _id: workshop ? workshop._id : null, // Retain the ID for updates
      topic,
      date,
      teacherId,
    };
    onSave(updatedWorkshop); // Call the onSave function to save the data
  };

  return (
    <div className="workshop-form-container">
      <div className="workshop-form-card">
        <h3>{workshop ? 'Update Workshop' : 'Add Workshop'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Topic:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic"
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Teacher ID:</label>
            <input
              type="text"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              placeholder="Enter teacher ID"
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-save">
              {workshop ? 'Update' : 'Add'} Workshop
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkshopForm;
