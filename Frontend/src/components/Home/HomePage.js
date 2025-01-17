import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css'; 

const HomePage = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await axios.get("http://localhost:2000/api/submissions");
      setSubmissions(res.data);
    };
    fetchSubmissions();
  }, []);

  return (
    <div className={styles.homePageContainer}>
      <h1 className={styles.homePageTitle}>Interview Experiences</h1>
      {submissions.map((submission) => (
        <div key={submission._id} className={styles.submissionCard}>
          <h3>{submission.company}</h3>
          <p>Submitted by: {submission.name} ({submission.country})</p>
          <Link to={`/submission/${submission._id}`} className={styles.viewLink}>View</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
