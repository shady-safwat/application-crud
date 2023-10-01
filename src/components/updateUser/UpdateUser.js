import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../../redux/user/userSlice";
import "./UpdateUser.css";

function UpdateUser() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.user);
  const singleUser = users.filter((user) => user.id === id);
  const [edit, setEdit] = useState(singleUser[0]);

  // Loading
  if (loading === true) {
    return <h3 className="mt-5 fw-bold text-black">Loading....</h3>;
  }

  // Error
  if (error !== null) {
    return <h3 className="mt-5 fw-bold text-black">{error}</h3>;
  }

  const newData = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser({ ...edit, id }));
    navigate("/read");
  };
  return (
    <form
      className="edit-user w-25 h-100"
      onSubmit={handleUpdate}
      style={{ marginTop: "3rem" }}
    >
      <h2 className="form-title text-center">Edit The Data</h2>
      <div className="mb-3">
        <label htmlFor="exampleInputText1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputText1"
          name="name"
          value={edit && edit.name}
          onChange={newData}
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
          aria-describedby="emailHelp"
          name="email"
          value={edit && edit.email}
          onChange={newData}
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
          name="password"
          value={edit && edit.password}
          onChange={newData}
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
          name="age"
          value={edit && edit.age}
          onChange={newData}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-check-input"
          type="radio"
          id="exampleRadios1"
          name="gender"
          value="Male"
          checked={edit && edit.gender === "Male"}
          onChange={newData}
        />
        <label className="form-check-label" htmlFor="exampleRadios1">
          Male
        </label>
      </div>

      <div className="mb-3">
        <input
          className="form-check-input"
          type="radio"
          id="exampleRadios2"
          name="gender"
          value="Female"
          checked={edit && edit.gender === "Female"}
          onChange={newData}
        />
        <label className="form-check-label" htmlFor="exampleRadios2">
          Female
        </label>
      </div>

      <div className="d-grid gap-2 col-6 mx-auto">
        <button type="submit" className="btn-edit btn text-black">
          Edit User
        </button>
      </div>
    </form>
  );
}

export default UpdateUser;
