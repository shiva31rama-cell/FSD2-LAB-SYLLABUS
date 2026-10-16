import { useNavigate, useParams } from 'react-router-dom';
import { students } from './Students';

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = students.find((item) => item.id === id);

  if (!student) return <p>No student found with id {id}.</p>;

  return (
    <section>
      <h2>{student.name}</h2>
      <p>Branch: {student.branch}</p>
      <button onClick={() => navigate('/students')}>Back to Students</button>
    </section>
  );
}
