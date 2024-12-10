import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/marks.css";

const Marks = () => {
  const [marks, setMarks] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    subject: "",
    marksObtained: "",
    totalMarks: 100,
    teacherId: "",
  });
  const [editingMark, setEditingMark] = useState(null);

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // Fetch marks, students, and teachers on component mount
  useEffect(() => {
    fetchMarks();
    fetchStudents();
    fetchTeachers();
  }, []);

  const fetchMarks = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/marks");
      setMarks(response.data);
    } catch (error) {
      console.error("Error fetching marks:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMark) {
        const response = await axios.put(
          `http://localhost:2000/api/marks/${editingMark._id}`,
          formData
        );
        setMarks((prevMarks) =>
          prevMarks.map((mark) =>
            mark._id === editingMark._id ? response.data : mark
          )
        );
        alert("Mark updated successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:2000/api/marks",
          formData
        );
        setMarks([...marks, response.data]);
        alert("Mark added successfully!");
      }
      setFormData({
        studentId: "",
        subject: "",
        marksObtained: "",
        totalMarks: 100,
        teacherId: "",
      });
      setEditingMark(null);
    } catch (error) {
      console.error("Error saving mark:", error);
      alert("Failed to save mark.");
    }
  };

  const handleEdit = (mark) => {
    setEditingMark(mark);
    setFormData({
      studentId: mark.studentId,
      subject: mark.subject,
      marksObtained: mark.marksObtained,
      totalMarks: mark.totalMarks,
      teacherId: mark.teacherId,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/marks/${id}`);
      setMarks(marks.filter((mark) => mark._id !== id));
      alert("Mark deleted successfully!");
    } catch (error) {
      console.error("Error deleting mark:", error);
      alert("Failed to delete mark.");
    }
  };

  return (
    <div className="marks-container">
      <h1>Marks Management</h1>

      <form className="marks-form" onSubmit={handleSubmit}>
        <h2>{editingMark ? "Edit Mark" : "Add New Mark"}</h2>

        <label>
          Student:
          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Subject:
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Marks Obtained:
          <input
            type="number"
            name="marksObtained"
            value={formData.marksObtained}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Total Marks:
          <input
            type="number"
            name="totalMarks"
            value={formData.totalMarks}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Teacher:
          <select
            name="teacherId"
            value={formData.teacherId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.firstName} {teacher.lastName}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">{editingMark ? "Update Mark" : "Add Mark"}</button>
      </form>

      <h2>Marks List</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Marks Obtained</th>
            <th>Total Marks</th>
            <th>Grade</th>
            <th>Teacher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark) => (
            <tr key={mark._id}>
              <td>
                {mark.studentId?.firstName} {mark.studentId?.lastName}
              </td>
              <td>{mark.subject}</td>
              <td>{mark.marksObtained}</td>
              <td>{mark.totalMarks}</td>
              <td>{mark.grade}</td>
              <td>
                {mark.teacherId?.firstName} {mark.teacherId?.lastName}
              </td>
              <td>
                <button onClick={() => handleEdit(mark)}>Edit</button>
                <button onClick={() => handleDelete(mark._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Marks;
