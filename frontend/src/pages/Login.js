import { useEffect, useState } from "react";
import http from "../helper/http";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  function handleChange(event) {
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    } // eslint-disable-next-line
  }, []);

  function submitForm() {
    http
      .post(`http://localhost:8000/user/login`, inputs)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/home");
      })
      .catch((error) => {
        alert("Invalid credentials");
      });
  }

  return (
    <div className="container">
      <div className="pageTitle">Login</div>
      <div className="container border-1">
        <div className="row">
          <div className="col-md-6 justify-content-center">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              placeholder="Email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mb-2"
              placeholder="********"
              value={inputs.password || ""}
              onChange={handleChange}
            />
            <button className="btn btn-primary" onClick={submitForm}>
              Login
            </button>
            <br />
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
