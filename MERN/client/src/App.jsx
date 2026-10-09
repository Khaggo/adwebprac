import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";
 
 
function App() {
 
 
  const [students, setStudents] = useState([]);
 
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
 
  const [editingId, setEditingId] = useState(null);
 
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/students`);
      setStudents(response.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };
 
  useEffect(() => {
    fetchStudents();
  }, []);
 
  const clearForm = () => {
    setName("");
    setCourse("");
    setAge("");
    setEditingId(null);
  };
 
  const addStudent = async () => {
    if (!name.trim() || !course.trim() || age === "") {
      alert("Please fill in all fields.");
      return;
    }
 
    if (Number(age) < 0) {
      alert("Age must be a non-negative whole number.");
      return;
    }
 
    try {
      await axios.post(`${API_URL}/students`, {
        name,
        course,
        age: Number(age),
      });
      clearForm();
      fetchStudents();
    } catch (error) {
      console.log("Error adding student:", error);
      alert("Failed to add student.");
    }
  };
 
  const editStudent = (student) => {
    setName(student.name);
    setCourse(student.course);
    setAge(String(student.age));
    setEditingId(student._id);
  };
 
  const updateStudent = async () => {
    if (!name.trim() || !course.trim() || age === "") {
      alert("Please fill in all fields.");
      return;
    }
 
    if (Number(age) < 0) {
      alert("Age must be a non-negative whole number.");
      return;
    }
 
    try {
      await axios.put(`${API_URL}/students/${editingId}`, {
        name,
        course,
        age: Number(age),
      });
 
      clearForm();
      fetchStudents();
    } catch (error) {
      console.log("Error updating student:", error);
      alert("Failed to update student.");
    }
  };
 
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.log("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };
 
  return (
    <div>
      <h1>Student Management System</h1>
      <h2>Welcome to our MERN Application</h2>
 
      <h3>{editingId ? "Edit Student" : "Add Student"}</h3>
 
      <input
        type="text"
        placeholder="Name:"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
 
      <br />
      <br />
 
      <input
        type="text"
        placeholder="Course:"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
 
      <br />
      <br />
 
      <input
        type="number"
        placeholder="Age:"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
 
      <br />
      <br />
 
      {editingId ? (
        <>
          <button onClick={updateStudent}>Update Student</button>
          <button onClick={clearForm}>Cancel</button>
        </>
      ) : (
        <button onClick={addStudent}>Add Student</button>
      )}
 
      <br/>
 
      <hr />
 
      <h2>Student List</h2>
 
      {students.map((student) => (
        <div key={student._id}>
          <h3>{student.name}</h3>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
 
          <button onClick={() => editStudent(student)}>
            Edit
          </button>
 
          <button onClick={() => deleteStudent(student._id)}>
            Delete
          </button>
 
          <hr />
        </div>
      ))}
    </div>
  );
}
 
export default App;