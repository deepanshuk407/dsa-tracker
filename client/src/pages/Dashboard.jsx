import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await API.get("/api/questions");
      setQuestions(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div style={{ color: "black", padding: "20px" }}>
      <h1>Dashboard 🚀</h1>

      <h3>Total Questions: {questions.length}</h3>

      {questions.map((q) => (
        <div key={q._id} style={card}>
          <h4>{q.title}</h4>
          <p>{q.topic} | {q.difficulty}</p>
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "#1e293b",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px",
};

export default Dashboard;