import { useState } from 'react';

const subjects = ['ExpressJS', 'ReactJS', 'MongoDB', 'Node.js'];
const initialStudents = [
  { id: 1, name: 'Anitha', branch: 'CSE', year: 3, cgpa: 8.9 },
  { id: 2, name: 'Ravi', branch: 'ECE', year: 2, cgpa: 7.8 },
  { id: 3, name: 'Sneha', branch: 'CSE', year: 3, cgpa: 9.1 },
  { id: 4, name: 'Kiran', branch: 'MECH', year: 4, cgpa: 7.2 },
  { id: 5, name: 'Meena', branch: 'ECE', year: 3, cgpa: 8.4 },
];

function StudentRow({ student, onRemove }) {
  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.branch}</td>
      <td>{student.year}</td>
      <td>{student.cgpa.toFixed(1)}</td>
      <td><button onClick={() => onRemove(student.id)}>Remove</button></td>
    </tr>
  );
}

export default function ListDemo() {
  const [students, setStudents] = useState(initialStudents);
  const [branch, setBranch] = useState('ALL');
  const visibleStudents = students.filter(
    (student) => branch === 'ALL' || student.branch === branch,
  );

  function removeStudent(id) {
    // Filter returns a new array; do not mutate the existing state.
    setStudents((current) => current.filter((student) => student.id !== id));
  }

  return (
    <section>
      <h2>Part (b): Rendering Lists Demo</h2>
      <h3>1. List of strings</h3>
      <ul>{subjects.map((subject) => <li key={subject}>{subject}</li>)}</ul>

      <h3>2. Student object list/table</h3>
      <label>Filter by branch:{' '}
        <select value={branch} onChange={(event) => setBranch(event.target.value)}>
          <option value="ALL">All branches</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="MECH">MECH</option>
        </select>
      </label>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead><tr><th>Name</th><th>Branch</th><th>Year</th><th>CGPA</th><th>Action</th></tr></thead>
        <tbody>
          {visibleStudents.map((student) => (
            <StudentRow key={student.id} student={student} onRemove={removeStudent} />
          ))}
        </tbody>
      </table>
      {visibleStudents.length === 0 && <p>No students match this branch filter.</p>}
    </section>
  );
}
