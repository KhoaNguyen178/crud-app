import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, fetchStudents } from "../actions";
export default function AddStudent() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // Access the students state from the Redux store using useSelector
  const students = useSelector((state) => state.students);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    dob: "",
    major: "",
  });

  // Render the form when students data is available
  const { firstName, middleName, lastName, dob, major } = students;
  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "dob") {
      console.log(name, value);
      // Capitalize the first letter of each word in the input
      const capitalizedValue = value
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      // Update the students state using Redux dispatch
      // dispatch({
      //   type: "ADD_STUDENT_SUCCESS",
      //   payload: { [name]: capitalizedValue },
      // });
      setData({ ...data, [name]: capitalizedValue });
    } else {
      // Update the students state using Redux dispatch
      console.log(name, value);
      // dispatch({
      //   type: "ADD_STUDENT_SUCCESS",
      //   payload: { [name]: value },
      // });
      setData({ ...data, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addStudent(data));
    toast.success("Student Added Successfully");
    // Fetch the updated list of students after adding a new student
    await dispatch(fetchStudents()).then(() => {
      navigate("/");
      // window.location.reload();
    });
  };

  return (
    <div className="container">
      <div className="col-md-6 offset-md-3 my-5 border rounded p-4 mt-2 shadow">
        <form onSubmit={(e) => onSubmit(e)} class="row g-3">
          <h2 className="text-center">Add Student</h2>
          <div className="col-md-4">
            <label for="inputLastName" className="form-label">
              Last name <a style={{ color: "red" }}> *</a>
            </label>
            <input
              id="inputLastName"
              type="text"
              className="form-control"
              name="lastName"
              value={lastName}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-md-4">
            <label for="inputMiddleName" className="form-label">
              Middle name
            </label>
            <input
              value={middleName}
              type="text"
              className="form-control"
              name="middleName"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-md-4">
            <label for="inputFirstName" className="form-label">
              First name <a style={{ color: "red" }}> *</a>
            </label>
            <input
              value={firstName}
              type="text"
              className="form-control"
              name="firstName"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>

          <div className="col-md-6">
            <label for="inputDob" className="form-label">
              Date of Birth <a style={{ color: "red" }}> *</a>
            </label>
            <input
              value={dob}
              type="date" //yyyy-mm-dd>{student.dob}</td>
              className="form-control text-center"
              name="dob"
              onChange={(e) => onInputChange(e)}
              min="1000-01-01"
              max="2024-01-01"
              required
            />
          </div>
          <div className="col-md-6">
            <label for="major" className="form-label">
              Major <a style={{ color: "red" }}> *</a>
            </label>
            <input
              value={major}
              type="text"
              className="form-control"
              name="major"
              onChange={(e) => onInputChange(e)}
              required
              style={{ textTransform: "capitalize" }}
            />
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <Link className="btn btn-outline-danger" to="/">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
