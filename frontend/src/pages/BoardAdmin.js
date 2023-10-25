import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../Components/FormatDate";
import ConfirmBox from "../Components/ConfirmBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, deleteStudent } from "../actions";
import UserService from "../services/user.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  // get student data
  useEffect(() => {
    dispatch(fetchStudents());
    console.log(dispatch(fetchStudents()));
  }, [dispatch]);
  //admin board
  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  function handleDeleteStudent() {
    dispatch(deleteStudent(deleteData?.id));
    setOpen(false);
    toast.success("Student deleted successfully !");
  }
  //open delete dialog
  function openDelete(student) {
    setOpen(true);
    setDeleteData(student);
  }
  //pagination
  // const sizePerPageRenderer = ({
  //   options,
  //   currSizePerPage,
  //   onSizePerPageChange,
  // }) => (
  //   <div className="btn-group" role="group">
  //     {options.map((option) => {
  //       const isSelect = currSizePerPage === `${option.page}`;
  //       return (
  //         <button
  //           key={option.text}
  //           type="button"
  //           onClick={() => onSizePerPageChange(option.page)}
  //           className={`btn ${isSelect ? "btn-primary" : "btn-secondary"}`}
  //         >
  //           {option.text}
  //         </button>
  //       );
  //     })}
  //   </div>
  // );

  // const options = {
  //   sizePerPageRenderer,
  // };

  //Bootstrap table
  const studentsWithIndex = students.map((student, index) => ({
    ...student,
    index: index + 1,
  }));

  //exoport csv
  const { ExportCSVButton } = CSVExport;
  //search
  const MySearch = (props) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (event) => {
      const value = event.target.value;
      setSearchQuery(value);
      props.onSearch(value); // Call the onSearch method passed by ToolkitProvider
    };

    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
      if (event.key === "Escape" || event.key === "Delete") {
        handleClear();
      }
    };

    const handleSearch = () => {
      props.onSearch(searchQuery);
    };

    const handleClear = () => {
      setSearchQuery("");
      props.onSearch(""); // Perform a search with an empty query to reset the table
    };
    return (
      <div className="col-md-12  ">
        <div className="row g-3 d-flex flex-row  ">
          <div className="col-md-6">
            <input
              className="form-control"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="Search this table"
            />
          </div>
          <div className="col-md-6 d-flex">
            <button className="btn btn-primary me-2" onClick={handleSearch}>
              Search
            </button>
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Custom formatter for the "action" column
  const actionFormatter = (cell, row) => {
    return (
      <div>
        <Link to={`/update-student/${row.id}`}>
          <button
            type="button"
            className="btn btn-outline-success m-1"
            title="Edit"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/UniversalEditButton3.svg/1024px-UniversalEditButton3.svg.png"
              alt="edit"
              width="20"
              height="20"
            />
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-outline-danger m-1"
          title="Delete"
          onClick={() => openDelete(row)}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3687/3687412.png"
            alt="delete"
            width="20"
            height="20"
          ></img>
        </button>
      </div>
    );
  };

  const dobHeaderFormatter = (
    column,
    colIndex,
    { sortElement, filterElement }
  ) => {
    return (
      <div>
        {column.text}
        {sortElement}
        <div style={{ fontSize: "10px", fontWeight: "lighter" }}>
          MM/dd/yyyy
        </div>
      </div>
    );
  };
  // Custom cell style for the "index" column
  const headerStyle = {
    verticalAlign: "top",
  };

  //Columns
  const columns = [
    {
      dataField: "index",
      text: "Index",
      // formatter: indexFormatter, // Using the custom index formatter
      headerStyle: headerStyle, // Setting headerStyle to headerStyle
      sort: true,
    },
    // {
    //   dataField: "id",
    //   text: "Id",
    //   headerStyle: headerStyle, // Setting headerStyle to headerStyle
    //   sort: true,
    // },
    {
      dataField: "lastName",
      text: "Last Name",
      headerStyle: headerStyle,
      sort: true,
    },
    {
      dataField: "middleName",
      text: "Middle Name",
      headerStyle: headerStyle,
      sort: true,
    },
    {
      dataField: "firstName",
      text: "First Name",
      headerStyle: headerStyle,
      sort: true,
    },
    {
      dataField: "dob",
      text: "Date of Birth",
      formatter: (cell, row) => formatDate(cell), // Using the dateFormat function to format the date
      headerFormatter: dobHeaderFormatter, // Using the custom header formatter
      headerStyle: headerStyle,
      sort: true,
    },
    {
      dataField: "major",
      text: "Major",
      headerStyle: headerStyle,
      sort: true,
    },
    {
      dataField: "action",
      text: "Action",
      formatter: actionFormatter, // Using the custom action formatter
      headerStyle: headerStyle,
    },
  ];
  //Manually manage pagination state
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of rows to show per page

  // Calculate the index of the first and last items of the current page
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = studentsWithIndex.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  return (
    <div className="container">
      <div className="py-3">
        <h1 className="text-center">{content}</h1>
        <div className="container">
          <ToolkitProvider
            keyField="id"
            data={studentsWithIndex}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <div className="col-md-12 mx-auto pb-3">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-4">
                      <Link className="btn btn-success" to="/add-student">
                        Add Student +
                      </Link>
                    </div>
                    <div className="col-md-8">
                      <MySearch {...props.searchProps} />
                    </div>
                  </div>
                </div>
                {/* <hr /> */}
                <BootstrapTable
                  {...props.baseProps}
                  striped
                  hover
                  condensed
                  // pagination={paginationFactory()}
                />

                <ExportCSVButton
                  className="btn btn-success mx-0"
                  {...props.csvProps}
                >
                  Export CSV
                </ExportCSVButton>
              </div>
            )}
          </ToolkitProvider>
          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              {Array.from(
                { length: Math.ceil(studentsWithIndex.length / pageSize) },
                (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      index + 1 === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      <ConfirmBox
        open={open}
        closeDialog={() => setOpen(false)}
        firstName={deleteData.firstName}
        deleteFunction={handleDeleteStudent}
      />
      <ToastContainer position="top-right" />
    </div>
  );
};

export default BoardAdmin;
