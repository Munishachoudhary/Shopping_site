import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
        role,
      });

      // Save token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      alert("Login Successful");

      // Redirect
      if (data.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center mb-4">Login</h2>

      <form onSubmit={submitHandler}>

        {/* Role Selection */}
        <select
          className="form-control mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">Login as User</option>
          <option value="admin">Login as Admin</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Login
        </button>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;