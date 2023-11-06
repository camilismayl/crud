import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface InputData {
  name: string;
  email: string;
}
export default function Add() {
  const [inputData, setInputData] = useState<InputData>({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //formsubmit type
    axios
      .post("http://localhost:8000/users", inputData)
      .then(() => {
        alert("Success");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
