// A simple reusable component that receives student details through props.
function StudentCard({ name, branch, year, cgpa }) {
  return (
    <div className="student-card">
      <h2>{name}</h2>
      <p><b>Branch:</b> {branch}</p>
      <p><b>Year:</b> {year}</p>
      <p><b>CGPA:</b> {cgpa}</p>
    </div>
  );
}

export default StudentCard;
