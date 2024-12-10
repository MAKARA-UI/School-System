import React, { useState } from 'react';

function AnnouncementComponent() {
    // State to store input values
    const [teacherID, setTeacherID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date

    // Function to handle adding a message
    const handleAddMessage = async () => {
        if (!teacherID || !firstName || !lastName || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const response = await fetch('http://192.168.111.92:4000/api/announcements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ teacherID, firstName, lastName, message, date }),
            });

            if (!response.ok) {
                throw new Error(`Failed to add message. Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Message added successfully:', data);
            alert('Announcement added successfully!');

            // Clear the input fields after successful submission
            setTeacherID('');
            setFirstName('');
            setLastName('');
            setMessage('');
            setDate(new Date().toISOString().split('T')[0]);
        } catch (error) {
            console.error('Error adding message:', error.message || error);
            alert('Failed to add announcement.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Add Announcement</h2>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Teacher ID:
                    <input
                        type="text"
                        value={teacherID}
                        onChange={(e) => setTeacherID(e.target.value)}
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                        required
                    />
                </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                        required
                    />
                </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                        required
                    />
                </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Message:
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                        required
                    ></textarea>
                </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </label>
            </div>
            <button onClick={handleAddMessage} style={{ padding: '10px 15px', cursor: 'pointer' }}>
                Add Announcement
            </button>
        </div>
    );
}

export default AnnouncementComponent;
