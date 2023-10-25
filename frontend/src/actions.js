// actions.js
import AuthService from "./services/auth.service";
import axios from "axios";
import {
  FETCH_STUDENTS_SUCCESS,
  DELETE_STUDENT_SUCCESS,
  ADD_STUDENT_SUCCESS,
  UPDATE_STUDENT_SUCCESS,
  FIND_STUDENT_SUCCESS,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";

export const fetchStudents = () => async (dispatch) => {
  try {
    const studentData = await axios.get("http://localhost:8090/student");
    const token = studentData.data.token; // Get the token from the response
    //TODO: check if token is valid
    // if (token) {
    dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: studentData.data });
    // }
    console.log(studentData.data);
  } catch (error) {
    console.log(error);
    // Handle error if needed
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8090/delete/${id}`);
    dispatch({ type: DELETE_STUDENT_SUCCESS, payload: id });
  } catch (error) {
    console.log(error);
    // Handle error if needed
  }
};
export const addStudent = (studentData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    console.log(token);
    // Make sure the token is available
    if (token) {
      // Include the token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(config);
      await axios.post("http://localhost:8090/save", studentData, config);
      dispatch({ type: ADD_STUDENT_SUCCESS });
    }
  } catch (error) {
    console.log(error);
    // Handle error if needed
  }
};
//add can be used for both update and add
export const updateStudent = (id, studentData) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:8090/update/${id}`, studentData);
    console.log(studentData);
    dispatch({ type: UPDATE_STUDENT_SUCCESS, payload: id });
  } catch (error) {
    console.log(error);
    // Handle error if needed
  }
};

export const findStudent = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:8090/student/${id}`);
    const studentData = response.data; // Assuming the response contains the student data
    console.log(studentData);
    // return studentData;
    return dispatch({ type: FIND_STUDENT_SUCCESS, payload: studentData });

    // return studentData;
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};
export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
