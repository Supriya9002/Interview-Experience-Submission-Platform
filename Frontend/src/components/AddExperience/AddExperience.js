import { useState} from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import style from "./AddCustomer.module.css"; // Assuming you'll rename the file accordingly

const AddExperience = () => {
  const [formData, setFormData] = useState({ name: "", country: "", company: "", questions: [""]});
  const navigator = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      console.log(token)
      console.log("formData", formData);
      
      const response = await axios.post(
        "http://localhost:2000/api/submissions",
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      navigator("/")
      console.log("Submission successful", response.data);
    } catch (err) {
      console.error("Error submitting experience", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={style.SignContainer}>
      <h1 className={style.Sign}>Add Experience</h1>
      <form className={style.SignForm} onSubmit={handleSubmit}>
        <input
          className={style.inputFild}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Your Name"
          required
        />
        <input
          className={style.inputFild}
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Enter Your Country"
          required
        />
        <input
          className={style.inputFild}
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Enter Company Name"
          required
        />
        <div>
          <label className={style.Labelinput}>Questions:</label>
          {formData.questions.map((question, index) => (
            <input
              key={index}
              className={style.inputFild}
              type="text"
              value={question}
              onChange={(e) => {
                const updatedQuestions = [...formData.questions];
                updatedQuestions[index] = e.target.value;
                setFormData({ ...formData, questions: updatedQuestions });
              }}
              placeholder={`Question ${index + 1}`}
            />
          ))}
          <button
            type="button"
            className={style.inputFild}
            onClick={() =>
              setFormData({
                ...formData,
                questions: [...formData.questions, ""],
              })
            }
          >
            Add Question
          </button>
        </div>
        <button className={style.inputFild} type="submit">
          Submit Experience
        </button>
      </form>
    </div>
  );
};

export default AddExperience;
