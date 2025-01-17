import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./Login.module.css"; 

function Login() {
  const [formData, setFormdata] = useState({ mobaile: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post("http://localhost:2000/api/admin/login", formData);
      localStorage.setItem("authToken", response.data); 
      navigate("/"); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.SignContainer}>
      <h1 className={style.Sign}>Log In</h1>
      <form className={style.SignForm} onSubmit={handleSubmit}>
        <input
          placeholder="Enter Mobile No"
          type="number"
          value={formData.mobaile}
          onChange={(e) => setFormdata({ ...formData, mobaile: e.target.value })}
          required
        />
        <input
          placeholder="Enter Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormdata({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">LogIn</button>
      </form>
      <p className={style.hal}>
        Don't have an account? <a href="/register" className={style.don}>Register</a>
      </p>
    </div>
  );
}

export default Login;
