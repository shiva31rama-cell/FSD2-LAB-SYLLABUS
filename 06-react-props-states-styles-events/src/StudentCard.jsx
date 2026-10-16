import styles from './StudentCard.module.css';

/** Props are read-only values supplied by the parent component. */
export default function StudentCard({ name, branch, year, cgpa }) {
  return (
    <article className={styles.card}>
      <h3>{name}</h3>
      <p>Branch: {branch} | Year: {year}</p>
      <p>CGPA: {cgpa}</p>
    </article>
  );
}
