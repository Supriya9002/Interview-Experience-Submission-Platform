import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./Register.module.css"; 

function Register() {
  const [formData, setFormdata] = useState({ name: "", mobaile: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await axios.post("http://localhost:2000/api/admin/register", formData);
      console.log(response.data); 
      navigate("/login"); 
    } catch (err) {
      console.log(err);
    }
    setFormdata({ name: "", mobaile: "", password: "" }); 
  };

  return (
    <div className={style.SignContainer}>
      <h1 className={style.Sign}>Register</h1>
      <form className={style.SignForm} onSubmit={handleSubmit}>
        <input
          placeholder="Enter Name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormdata({ ...formData, name: e.target.value })}
          required
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
