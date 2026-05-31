import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="button primary-button">
            Register
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>

          <a className="auth-link" onClick={() => navigate("/login")}>
            Login
          </a>
        </div>
      </div>
    </main>
  );
};

export default Register;
