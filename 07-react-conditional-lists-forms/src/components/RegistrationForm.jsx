import { useState } from 'react';

const initialForm = {
  username: '',
  email: '',
  password: '',
  age: '',
  date: '',
  role: 'developer',
  experienceLevel: 'junior',
  agreeToTerms: false,
  comments: '',
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState(initialForm);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.alert(
      'Form Submitted Successfully!\n\nData: ' +
      JSON.stringify(formData, null, 2),
    );
  }

  function handleReset() {
    setFormData({ ...initialForm });
  }

  return (
    <section>
      <h2>Part (c): React Forms Example</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}
        style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
        <label>Username:
          <input type="text" name="username" value={formData.username}
            onChange={handleChange} required />
        </label>
        <label>Email:
          <input type="email" name="email" value={formData.email}
            onChange={handleChange} required />
        </label>
        <label>Password:
          <input type="password" name="password" value={formData.password}
            onChange={handleChange} required />
        </label>
        <label>Age:
          <input type="number" name="age" min="1" max="120"
            value={formData.age} onChange={handleChange} />
        </label>
        <label>Date:
          <input type="date" name="date" value={formData.date}
            onChange={handleChange} />
        </label>
        <label>Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>
        </label>
        <fieldset>
          <legend>Experience level</legend>
          <label><input type="radio" name="experienceLevel" value="junior"
            checked={formData.experienceLevel === 'junior'} onChange={handleChange} /> Junior</label>{' '}
          <label><input type="radio" name="experienceLevel" value="senior"
            checked={formData.experienceLevel === 'senior'} onChange={handleChange} /> Senior</label>
        </fieldset>
        <label><input type="checkbox" name="agreeToTerms"
          checked={formData.agreeToTerms} onChange={handleChange} />
          I agree to the terms and conditions
        </label>
        <label>Comments:
          <textarea name="comments" rows="3" value={formData.comments}
            onChange={handleChange} />
        </label>
        <div>
          <button type="submit" disabled={!formData.agreeToTerms}>Submit Form</button>{' '}
          <button type="reset">Reset</button>
        </div>
      </form>
    </section>
  );
}
