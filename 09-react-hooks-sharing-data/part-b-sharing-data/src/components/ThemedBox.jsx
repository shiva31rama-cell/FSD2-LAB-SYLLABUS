import { useTheme } from '../context/ThemeContext';

export default function ThemedBox() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      style={{
        background: isLight ? '#fff' : '#222',
        color: isLight ? '#222' : '#fff',
        border: '1px solid #999',
        borderRadius: 8,
        padding: 16,
      }}
    >
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(isLight ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </section>
  );
}
