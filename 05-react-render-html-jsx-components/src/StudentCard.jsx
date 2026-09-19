/**
 * Reusable StudentCard component.
 *
 * Props:
 * - name
 * - branch
 * - year
 * - cgpa
 */

function StudentCard({
  name,
  branch,
  year,
  cgpa,
}) {
  return (
    <div className="student-card">
      <h2>{name}</h2>

      <p>
        <strong>Branch:</strong> {branch}
      </p>

      <p>
        <strong>Year:</strong> {year}
      </p>

      <p>
        <strong>CGPA:</strong> {cgpa}
      </p>
    </div>
  );
}

export default StudentCard;
