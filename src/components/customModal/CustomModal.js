import React from "react";
import "./CustomModal.css";
import { useSelector } from "react-redux";

function CustomModal({ id, setShowModal } ) {
  const allUsers = useSelector((state) => state.user.users);
  const singleUser = allUsers.filter(user => user.id === id);

  return (
    // Modal background
    <div className="modalBackground">
      {/* Modal container */}
      <div className="modalContainer fw-bold">
        {/* Modal Header */}
        <div className=" modalHeader m-4  d-flex flex-row justify-content-between">
          {/* Modal Title */}
          <h5 className="modalTitle">View Data</h5>
          {/* Button close */}
          <button
            type="button"
            className="btn btn-close btn-sm "
            aria-label="Close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>
        {/* Get data from the users to display the user data  */}
        <div className="modalBody mt-5">
          <h3 className="user-name mb-3">Name: {singleUser[0].name}</h3>
          <h5 className="user-email mb-3">Email: {singleUser[0].email}</h5>
          <h6 className="user-age mb-3">Age: {singleUser[0].age}</h6>
          <h6 className="user-gender mb-3">Gender: {singleUser[0].gender}</h6>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
