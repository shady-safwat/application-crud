import React, { useEffect, useState } from "react";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUser } from "../../redux/user/userSlice";
import CustomModal from "../customModal/CustomModal";
import { Link } from "react-router-dom";

function ReadUser() {
  const [id, setId] = useState();
  const [showModal, setShowModal] = useState(false);
  // users: Array of user objects
  // loading: Boolean indicating if data is being fetched
  // error: Error object if data fetching fails
  // searchData: Array of user objects filtered by search criteria
  const { users, loading, error, searchData } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  // Fetch user data on component mount
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  /* Check if data is loading */
  if (loading === true) {
    return <h3 className="mt-5">Loading....</h3>;
  }

  /* Check if error is not null */
  if (error !== null) {
    return <h3 className="mt-5">{error}</h3>;
  }
  return (
    <div className=" all-user mt-5 w-50 fw-bold">
      {/* -- Call CustomModal from CustomModal files  -- */}
      {showModal && <CustomModal id={id} setShowModal={setShowModal} />}

      {/* -- Data  -- */}
      <h2 className="data-title mb-5 text-black text-center">All Data</h2>
      {users &&
        users
          // Filter the search data based on the search input
          .filter((search) => {
            // If there is no search input, return all search data
            if (searchData.length === 0) {
              return search;
            } else {
              // Otherwise, return only the search data that matches the search input
              return search.name
                .toLowerCase()
                .includes(searchData.toLowerCase());
            }
          })
          /* In this code block, we are mapping over the `users` array and creating a card for each user. 
          Each card displays the user's name, email, age, and gender. 
          The card also includes buttons for viewing, editing, and removing the user. The `onClick` event handlers for these buttons call the appropriate functions to perform these actions. */
          .map((user) => (
            <div
              className="card mb-5 text-center shadow bg-body-tertiary rounded"
              key={user.id}
            >
              <div className="card-body">
                <h5 className="card-title mb-2">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {user.email}
                </h6>
                <p className="card-text mb-2">{user.age}</p>
                <p className="card-text">{user.gender}</p>
                {/* -- Buttons action -- */}
                <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-3">
                  <Link
                    type="button"
                    className=" view-btn btn btn-outline-info"
                    title="View"
                    onClick={() => [setId(user.id), setShowModal(true)]}
                  >
                    <GrFormView className="view-icon fs-5" />
                  </Link>
                  <Link
                    to={`/edit/${user.id}`}
                    type="button"
                    className=" Edit-btn btn btn-outline-primary"
                    title="Edit"
                  >
                    <AiFillEdit className="edit-icon fs-5" />
                  </Link>
                  <Link
                    type="button"
                    className=" remove-btn btn btn-outline-danger"
                    title="Remove"
                    onClick={() => dispatch(deleteUser(user.id))}
                  >
                    <AiFillCloseCircle className="remove-icon fs-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

export default ReadUser;
