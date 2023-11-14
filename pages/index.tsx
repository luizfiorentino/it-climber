import { useState } from "react";
import styles from "./page.module.css";

import axios from "axios";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [link, setLink] = useState("");
  const [feedback, setFeedback] = useState("");

  const data = { title, description, company, link, feedback };

  const submitApplication = async () => {
    await axios.post(`/api/vacancies`, data);
    setCompany("");
    setTitle("");
    setFeedback("");
    setDescription("");
    setLink("");
  };

  return (
    <main className={styles.main}>
      <div>
        <h2>Welcome to itClimber</h2>
        <h4>+ New Vacancy</h4>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <label>link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <label>feedback</label>
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button onClick={submitApplication}>Add</button>
        </div>
      </div>
    </main>
  );
}
