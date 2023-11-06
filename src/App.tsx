import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface UserData {
  id: number;
  name: string;
  email: string;
  // Add more properties as needed
}
function App() {
  const navigate = useNavigate();
  const [columns, setColumns] = useState<string[]>([]);
  const [records, setRecords] = useState<UserData[]>([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/users`).then((res) => {
      setColumns(Object.keys(res.data[0]));
      setRecords(res.data);
    });
  }, []);

  function handleSubmit(id: number) {
    const conf = window.confirm("Do you want to delete ?");
    if (conf) {
      axios
        .delete(`http://localhost:8000/users/` + id)
        .then(() => {
          alert("deleted");
          setRecords((prevRecords) =>
            prevRecords.filter((record) => record.id !== id)
          );

          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="container mt-5">
      <div className="text-end">
        <Link to="/create" className="btn">
          Add+
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>
                <Link to={`/update/${d.id}`}>Update</Link>
                <button onClick={() => handleSubmit(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
