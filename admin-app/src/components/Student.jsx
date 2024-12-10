import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/student.css";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    studentID: "",
    course: "",
    year: "",
  });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStudent = async () => {
    try {
      await axios.post("http://localhost:5000/api/students", formData);
      fetchStudents();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        studentID: "",
        course: "",
        year: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleEditStudent = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/students/${editingStudent._id}`,
        formData
      );
      fetchStudents();
      setEditingStudent(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        studentID: "",
        course: "",
        year: "",
      });
    } catch (error) {
      console.error("Error editing student:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setFormData(student);
  };

  return (
    <div className="container">
      <h1>Student Management</h1>

      {/* Form */}
      <div className="form-container">
        <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editingStudent ? handleEditStudent() : handleAddStudent();
          }}
        >
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
            name="studentID"
            value={formData.studentID}
            onChange={handleInputChange}
            placeholder="studentID"
            required
          />
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            placeholder="Course"
            required
          />
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            placeholder="Year of Study"
            required
          />
          <button type="submit">{editingStudent ? "Save" : "Add"}</button>
        </form>
      </div>

      {/* Student List */}
      <div className="student-list">
        <h2>Students</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>studentID</th>
              <th>Course</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.studentID}</td>
                <td>{student.course}</td>
                <td>{student.year}</td>
                <td>
                  <button onClick={() => handleEditClick(student)}
                  style={{ backgroundColor: "green"}}
                  >Edit</button>
                  <button onClick={() => handleDeleteStudent(student._id)} 
                  style={{ backgroundColor: "red"}}>
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

export default Student;
