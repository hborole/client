import { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return (
    <form onSubmit={onSubmit} className="container mt-5">
      <h1 className="mb-3">Sign Up</h1>

      <div className="form-group mb-3">
        <label>Email Address</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group mb-3">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errors.length > 0 && (
        <div className="alert alert-danger mt-3">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}
