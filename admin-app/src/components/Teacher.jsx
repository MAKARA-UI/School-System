import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/teacher.css";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    teacherID: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    subjects: "",
  });
  const [editingTeacher, setEditingTeacher] = useState(null);

  // Fetch teachers when the component mounts
  useEffect(() => {
    fetchTeachers();
  }, []);

  // Fetch all teachers
  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new teacher
  const handleAddTeacher = async () => {
    try {
      await axios.post("http://localhost:3000/api/teachers", {
        ...formData,
        subjects: formData.subjects.split(",").map((subject) => subject.trim()), // Convert subjects to an array
      });
      fetchTeachers();
      setFormData({
        teacherID: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        subjects: "",
      });
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  // Edit an existing teacher
  const handleEditTeacher = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/teachers/${editingTeacher._id}`,
        {
          ...formData,
          subjects: formData.subjects.split(",").map((subject) => subject.trim()), // Convert subjects to an array
        }
      );
      fetchTeachers();
      setEditingTeacher(null);
      setFormData({
        teacherID: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        subjects: "",
      });
    } catch (error) {
      console.error("Error editing teacher:", error);
    }
  };

  // Delete a teacher
  const handleDeleteTeacher = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/teachers/${id}`);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  // Populate the form with teacher data for editing
  const handleEditClick = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      teacherID: teacher.teacherID,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      phone: teacher.phone,
      department: teacher.department,
      subjects: teacher.subjects.join(", "), // Convert subjects array to comma-separated string
    });
  };

  return (
    <div className="container">
      <h1>Teacher Management</h1>

      {/* Form */}
      <div className="form-container">
        <h2>{editingTeacher ? "Edit Teacher" : "Add Teacher"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editingTeacher ? handleEditTeacher() : handleAddTeacher();
          }}
        >
           <input
            type="text"
            name="teacherID"
            value={formData.teacherID}
            onChange={handleInputChange}
            placeholder="Teacher ID"
            required
          />

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            required
          />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="Department"
            required
          />
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleInputChange}
            placeholder="Subjects (comma-separated)"
            required
          />
          <button type="submit">{editingTeacher ? "Save" : "Add"}</button>
        </form>
      </div>

      {/* Teacher List */}
      <div className="teacher-list">
        <h2>Teachers</h2>
        <table>
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Subjects</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher.teacherID}</td>
                <td>{teacher.firstName}</td>
                <td>{teacher.lastName}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.department}</td>
                <td>{teacher.subjects.join(", ")}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(teacher)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTeacher(teacher._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teacher;
