import { Link } from 'react-router-dom';

export const students = [
  { id: '1', name: 'Anitha', branch: 'CSE' },
  { id: '2', name: 'Ravi', branch: 'ECE' },
  { id: '3', name: 'Priya', branch: 'MECH' },
];

export default function Students() {
  return (
    <section>
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <Link to={`/students/${student.id}`}>{student.name}</Link> —{' '}
            {student.branch}
          </li>
        ))}
      </ul>
    </section>
  );
}
