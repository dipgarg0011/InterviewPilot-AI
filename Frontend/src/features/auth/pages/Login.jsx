import "./auth.form.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useState } from "react";


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loading, handleLogin} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({email, password});
    navigate("/");
  };

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <p className="subtitle">Welcome back! Sign in to continue.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e)=>{setEmail(e.target.value)}}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e)=>{setPassword(e.target.value)}}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="button primary-button submit-btn">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>

          <span className="auth-link" onClick={() => navigate("/register")}>
            Register
          </span>
        </div>
      </div>
    </main>
  );
};

export default Login;
