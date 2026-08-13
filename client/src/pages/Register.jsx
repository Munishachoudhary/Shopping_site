import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [adminKey, setAdminKey] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
        role,
        adminKey,
      });

      alert(data.message || "Registration Successful");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center mb-4">Register</h2>

      <form onSubmit={submitHandler}>

        <select
          className="form-control mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">Register as User</option>
          <option value="admin">Register as Admin</option>
        </select>

        <input
          type="text"
          placeholder="Full Name"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        {role === "admin" && (
          <input
            type="password"
            placeholder="Enter Admin Secret Key"
            className="form-control mb-3"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            required
          />
        )}

        <button
          type="submit"
          className="btn btn-success w-100"
        >
          Register
        </button>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;