import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AddQuestion() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    difficulty: "",
    topic: "",
    platform: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await API.post("/api/questions", form);
      alert("Question added!");
      navigate("/dashboard");
    } catch {
      alert("Error adding question");
    }
  };

  return (
    <div>
      <h2>Add Question</h2>

      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="difficulty" placeholder="Difficulty" onChange={handleChange} />
      <input name="topic" placeholder="Topic" onChange={handleChange} />
      <input name="platform" placeholder="Platform" onChange={handleChange} />
      <input name="notes" placeholder="Notes" onChange={handleChange} />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddQuestion;