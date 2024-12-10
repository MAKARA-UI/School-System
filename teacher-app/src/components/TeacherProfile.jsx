import { useState } from "react";
import axios from "axios";
import "../styles/TeacherProfile.css";

const TeacherProfile = () => {
  const [searchId, setSearchId] = useState(""); // To hold the ID entered for search
  const [searchResult, setSearchResult] = useState(null); // To store the search result
  const [error, setError] = useState(null); // To display error messages
  const [formData, setFormData] = useState({}); // Form data for editing
  const [editing, setEditing] = useState(false); // Whether editing is enabled

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchId(e.target.value);
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchId.trim()) {
      alert("Please enter a teacher ID to search.");
      return;
    }

    const url = `http://192.168.111.92:3000/api/teachers/${searchId}`;
    console.log("Request URL:", url); // Debugging log

    try {
      const response = await axios.get(url);
      setSearchResult(response.data);
      setError(null);
    } catch (err) {
      console.error("Error searching for teacher:", err.response?.data || err.message);
      setError("Teacher not found. Please check the ID and try again.");
      setSearchResult(null);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validateFormData = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.teacherID ||
      !formData.department ||
      !formData.subjects
    ) {
      return "All fields are required.";
    }

    if (!/^\d{11}$/.test(formData.phone)) {
      return "Phone number must be exactly 11 digits.";
    }

    return null;
  };

  // Handle form submission for updating
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateFormData();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      console.log("FormData being submitted:", formData); // Debugging log
      const response = await axios.put(
        `http://192.168.111.92:3000/api/teachers/${searchId}`,
        formData
      );
      alert("Teacher updated successfully!");
      setSearchResult(response.data);
      setEditing(false);
      setError(null);
    } catch (err) {
      console.error("Error updating teacher:", err.response?.data || err.message);
      setError("Failed to update teacher. Please check the input and try again.");
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    setEditing(false);
    setFormData({});
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Teacher Management</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Search Section */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Search Teacher</h2>
        <input
          type="text"
          placeholder="Enter Teacher ID"
          value={searchId}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display Search Result */}
      {searchResult && !editing && (
        <div style={{ marginBottom: "20px" }}>
          <h2>Search Result</h2>
          <p>
            <strong>Name:</strong> {searchResult.firstName} {searchResult.lastName}
          </p>
          <p>
            <strong>Email:</strong> {searchResult.email}
          </p>
          <p>
            <strong>Phone:</strong> {searchResult.phone}
          </p>
          <p>
            <strong>Teacher ID:</strong> {searchResult.teacherID}
          </p>
          <p>
            <strong>Department:</strong> {searchResult.department}
          </p>
          <p>
            <strong>Subjects:</strong> {searchResult.subjects.join(", ")}
          </p>
        </div>
      )}

      {/* Edit Form */}
      {editing && (
        <div style={{ marginTop: "20px" }}>
          <h2>Edit Teacher</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                pattern="\d{11}"
                title="Phone number must be exactly 11 digits"
              />
            </div>
            <div>
              <label>Teacher ID:</label>
              <input
                type="text"
                name="teacherID"
                value={formData.teacherID}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Department:</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Subjects:</label>
              <input
                type="text"
                name="subjects"
                value={formData.subjects}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;
