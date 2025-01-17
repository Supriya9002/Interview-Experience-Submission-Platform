import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from './ExperienceDetails.module.css';

const ExperienceDetails = () => {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { submissionID } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  console.log("Supriya",experience, submissionID, user);

  useEffect(() => {
    // Fetch experience details
    const fetchExperience = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/submissions/${submissionID}`);
        setExperience(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching experience details.");
        setLoading(false);
      }
    };

    const fetchUser = async () => {
        try {
          const token = localStorage.getItem("authToken"); 
          if (!token) {
            setError("No token found. Please log in.");
            setLoading(false);
            return;
          }
          const response = await axios.get("http://localhost:2000/api/admin/myDetails", {
            headers: {
              Authorization: `${token}`,
            },
          });
          setUser(response.data);
        } catch (err) {
          console.error("Error fetching user", err);
          setError("Error fetching user details.");
          setLoading(false);
        }
      };
      

    fetchExperience();
    fetchUser();
  }, [submissionID]);

  // Handle delete functionality
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:2000/api/submissions/${submissionID}`, {
        headers: {
          Authorization: `${localStorage.getItem("authToken")}`,
        },
      });
      alert("Submission deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error deleting submission", err);
      alert("You cannot delete this submission.");
    }
  };

  // Handle update 
  const handleUpdate = () => {
    // Redirect to an update form page
    navigate(`/update/${submissionID}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.experienceContainer}>
      <h2 className={styles.experienceTitle}>{experience.name}'s Experience</h2>
      <p className={styles.experienceDetails}>
        <strong>Country:</strong> {experience.country}
      </p>
      <p className={styles.experienceDetails}>
        <strong>Company:</strong> {experience.company}
      </p>
      <div>
        <h3>Questions:</h3>
        <ul className={styles.questionsList}>
          {experience.questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </div>

      {/* Conditionally render the update and delete buttons */}
      {user && experience.userId === user._id && (
        <div className={styles.actions}>
          <button onClick={handleUpdate} className={styles.updateButton}>
            Update
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceDetails;
