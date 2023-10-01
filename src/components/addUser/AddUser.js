import React, { useState } from "react";
import './AddUser.css';
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [users, setUsers] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value} = e.target;
    setUsers({ ...users, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(users);
    if (users !== "") {
      const id = Math.floor(Math.random() * 10000);
      dispatch(addUser({ ...users, user_id: `${id + 1}` }));
    }
    navigate("/read");

    setUsers({
      id: 0,
      name: "",
      email: "",
      password: "",
      age: "",
      gender: "",
    });
  };

  return (
    // Define form Add User
    <form
      className="add-user"
      onSubmit={handleSubmit}
      style={{ marginTop: "3rem" }}
    >
      <h2 className="form-title text-center mb-3">Fill The Data</h2>
      <div className="mb-3">
        <label htmlFor="exampleInputText1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputText1"
          placeholder="Enter your name..."
          name="name"
          value={users.name}
          onChange={handleChange}
          autoComplete="username"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter your email..."
          aria-describedby="emailHelp"
          name="email"
          value={users.email}
          onChange={handleChange}
          autoComplete="email"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Enter your password..."
          name="password"
          value={users.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputNumber1" className="form-label">
          Age
        </label>
        <input
          type="number"
          className="form-control"
          id="exampleInputNumber1"
          placeholder="Enter your age..."
          name="age"
          value={users.age}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-check-input"
          type="radio"
          id="exampleRadios1"
          name="gender"
          value="Male"
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="exampleRadios1">
          Male
        </label>
      </div>
      
      <div className="mb-4">
        <input
          className="form-check-input"
          type="radio"
          id="exampleRadios2"
          name="gender"
          value="Female"
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="exampleRadios2">
        <span className="checkmark"></span>
          Female
        </label>
      </div>

      <div className="d-grid gap-2 col-6 mx-auto">
        <button type="submit" className="btn-add btn text-black">
          Add User
        </button>
      </div>
      
    </form>
  );
}

export default AddUser;
