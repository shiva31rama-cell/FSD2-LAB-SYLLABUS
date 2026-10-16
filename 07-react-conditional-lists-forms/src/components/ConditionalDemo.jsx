import { useState } from 'react';

function Greeting({ isLoggedIn, name }) {
  if (isLoggedIn) return <h3>Welcome back, {name}!</h3>;
  return <h3>Please log in to continue.</h3>;
}

function RolePanel({ role }) {
  switch (role) {
    case 'student':
      return <p>Student panel: view timetable, marks and assignments.</p>;
    case 'faculty':
      return <p>Faculty panel: upload marks, post assignments.</p>;
    case 'admin':
      return <p>Admin panel: manage users and courses.</p>;
    default:
      return <p>Unknown role.</p>;
  }
}

export default function ConditionalDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [unread, setUnread] = useState(3);
  const [role, setRole] = useState('student');
  const authButton = isLoggedIn
    ? <button onClick={() => setIsLoggedIn(false)}>Logout</button>
    : <button onClick={() => setIsLoggedIn(true)}>Login</button>;

  return (
    <section>
      <h2>Part (a): Conditional Rendering Demo</h2>
      <h3>1. If / else and element variable</h3>
      <Greeting isLoggedIn={isLoggedIn} name="Anitha" />
      {authButton}

      <h3>2. Ternary operator</h3>
      <button onClick={() => setShowDetails((shown) => !shown)}>
        {showDetails ? 'Hide details' : 'Show details'}
      </button>
      {showDetails
        ? <p>React re-renders whenever state changes, so this text appears and disappears.</p>
        : <p>Details are hidden.</p>}

      <h3>3. Logical AND (&&)</h3>
      {isLoggedIn && unread > 0 && <p>You have {unread} unread message{unread > 1 ? 's' : ''}.</p>}
      {isLoggedIn && <button onClick={() => setUnread((count) => Math.max(0, count - 1))}>Mark one as read</button>}
      {!isLoggedIn && <p>Log in to see your messages.</p>}

      <h3>4. Switch statement</h3>
      <label>Role:{' '}
        <select value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <RolePanel role={role} />
    </section>
  );
}
