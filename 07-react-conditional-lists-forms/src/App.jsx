import ConditionalDemo from './components/ConditionalDemo';
import ListDemo from './components/ListDemo';
import RegistrationForm from './components/RegistrationForm';

export default function App() {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: '24px auto',
        padding: '0 16px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1>Experiment 7: Conditional Rendering, Lists and Forms</h1>
      <ConditionalDemo />
      <hr />
      <ListDemo />
      <hr />
      <RegistrationForm />
    </main>
  );
}
