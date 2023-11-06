import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

interface UserData {
  id: number;
  name: string;
  email: string;
}

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<UserData>({ id: 0, name: "", email: "" });

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault;
    axios
      .put("http://localhost:8000/users/" + id, data)
      .then(() => alert("succesfully updated"));
    navigate("/");
  }

  return (
    <div className="d-flex">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Id:</label>
            <input
              disabled
              type="text"
              name="name"
              value={data.id}
              className="form-control"
            />
          </div>{" "}
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={data.name}
              className="form-control"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              value={data.email}
              className="form-control"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
