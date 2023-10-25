import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../Components/FormatDate";
export default function ReadStudent() {
  const [students, setStudents] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    major: "",
  });
  //get id from url
  const { id } = useParams();
  //get student info
  useEffect(() => {
    loadStudent();
  }, []);
  const loadStudent = async () => {
    const result = await axios.get(`http://localhost:8090/student/${id}`);
    setStudents(result.data);
  };
  //format table
  const tableStyle = {
    width: "50%", // Set the desired width for the table
    margin: "0 auto",
  };

  return (
    <div className="container">
      <h2 className="text-center mt-2">Student Details</h2>
      <table
        class="table table-xl table-bordered table-hover table-striped"
        style={tableStyle}
      >
        <tbody>
          <tr>
            <th>Student ID</th>
            <td class="w-75">{students.id}</td>
          </tr>
          <tr>
            <th>First Name</th>
            <td>{students.firstName}</td>
          </tr>
          <tr>
            <th>First Name</th>
            <td>{students.middleName}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{students.lastName}</td>
          </tr>
          <tr>
            <th>Date of Birth</th>
            <td>{formatDate(students.dob)}</td>
          </tr>
          <tr>
            <th>Major</th>
            <td>{students.major}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
