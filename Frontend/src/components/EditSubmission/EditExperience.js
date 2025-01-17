import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import style from "./EditExperience.module.css"; // Assuming you'll rename the file accordingly

const EditExperience = () => {
  const [formData, setFormData] = useState({ name: "", country: "", company: "", questions: [""] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { submissionID } = useParams(); 
  const navigator = useNavigate();

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/submissions/${submissionID}`);
        setFormData({
          name: response.data.name,
          country: response.data.country,
          company: response.data.company,
          questions: response.data.questions,
        });
        setLoading(false);
      } catch (err) {
        setError("Error fetching submission data.");
        setLoading(false);
      }
    };
    fetchExperience();
  }, [submissionID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken"); 
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      const response = await axios.put(
        `http://localhost:2000/api/submissions/${submissionID}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("Update successful", response.data);
      navigator("/");
    } catch (err) {
      console.error("Error updating submission", err);
      setError("Error updating submission.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionChange = (e, index) => {
    const { value } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    setFormData({ ...formData, questions: [...formData.questions, ""] });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={style.SignContainer}>
      <h1 className={style.Sign}>Edit Experience</h1>
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
              onChange={(e) => handleQuestionChange(e, index)}
              placeholder={`Question ${index + 1}`}
            />
          ))}
          <button
            type="button"
            className={style.inputFild}
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
        </div>
        <button className={style.inputFild} type="submit">
          Update Experience
        </button>
      </form>
    </div>
  );
};

export default EditExperience;
