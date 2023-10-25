import "../App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent, fetchStudents, findStudent } from "../actions";

export default function UpdateStudent() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // const students = useSelector((state) => state.students);
  // const data = useSelector((state) => state.findStudentReducer);
  const [students, setStudents] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    dob: "",
    major: "",
    userId: "",
  });
  const { firstName, middleName, lastName, dob, major, userId } = students;
  // Fetch the current student data from the server based on ID
  const { id } = useParams();
  console.log(id);
  // useEffect(() => {
  //   fetchStudentDetails(id);
  // }, [id]);

  // const fetchStudentDetails = async (id) => {
  //   const state = dispatch(findStudent(id));
  //   console.log(state);
  //   // console.log(setData(dispatch(findStudent(id))));
  // };
  useEffect(() => {
    fetchStudentDetails(id);
  }, [id]);

  const fetchStudentDetails = async (id) => {
    // const { name, value } = students.target;
    console.log(dispatch(findStudent(id)));
    dispatch(findStudent(id))
      .then((response) => {
        const inputData = response.payload;
        console.log(inputData);
        console.log(setStudents(inputData));
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "dob") {
      console.log(name, value);
      // Capitalize the first letter of each word in the input
      const capitalizedValue = value
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      setStudents({ ...students, [name]: capitalizedValue });
    } else {
      console.log(name, value);

      setStudents({ ...students, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(students);
    dispatch(updateStudent(id, students));
    toast.success("Student Updated Successfully");
    // Fetch the updated list of students after adding a new student
    await dispatch(fetchStudents()).then(() => {
      navigate("/");
      // window.location.reload();
    });
  };
  // useEffect(() => {
  //   fetchStudentData();
  // }, [id]);
  // const fetchStudentData = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8090/student/${id}`);
  //     const studentData = response.data; // Assuming the response contains the student data
  //     setStudents(studentData);
  //     console.log(response.json);
  //   } catch (error) {
  //     console.error(error);
  //     // Handle error if needed
  //   }
  // };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className=" container">
        <div className=" col-md-6 offset-md-3 my-5 border rounded p-4 mt-2 shadow">
          <form onSubmit={(e) => onSubmit(e)} class="row g-3">
            <h2 className="text-centre">Update Student</h2>
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
                style={{ textTransform: "capitalize" }}
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
              <label for="Date of Birth" className="form-label">
                Date of Birth <a style={{ color: "red" }}> *</a>
              </label>
              <input
                className="form-control"
                type="date"
                name="dob"
                onChange={(e) => onInputChange(e)}
                value={dob}
                min="1000-01-01"
                max="2024-01-01"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="major" className="form-label">
                Major <a style={{ color: "red" }}>*</a>
              </label>
              <input
                value={major}
                type="text"
                className="form-control"
                name="major"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col-md-6">
              <label for="major" className="form-label">
                User ID <a style={{ color: "red" }}>*</a>
              </label>
              <input
                value={userId}
                type="text"
                className="form-control"
                name="major"
                onChange={(e) => onInputChange(e)}
                // required
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
    </LocalizationProvider>
  );
}
