// reducers.js
// import { combineReducers } from "redux";
import {
  FETCH_STUDENTS_SUCCESS,
  DELETE_STUDENT_SUCCESS,
  ADD_STUDENT_SUCCESS,
  UPDATE_STUDENT_SUCCESS,
  FIND_STUDENT_SUCCESS,
} from "../actionTypes";
// const initialState = {
//   students: {
//     firstName: "",
//     lastName: "",
//     middleName: "",
//     dob: "",
//     major: "",
//   },
// };
const studentsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_STUDENTS_SUCCESS:
      return action.payload;
    case DELETE_STUDENT_SUCCESS:
      return state.filter((student) => student.id !== action.payload);
    case UPDATE_STUDENT_SUCCESS:
      return state.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );

    default:
      return state;
  }
};
// needed, cuz default state is false, not null
// const addStudentReducer = (state = false, action) => {
//   switch (action.type) {
//     case ADD_STUDENT_SUCCESS:
//       return true;
//     default:
//       return state;
//   }
// };
// const findStudentReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FIND_STUDENT_SUCCESS:
//       return {
//         students: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default combineReducers({
//   students: studentsReducer,
//   addStudentReducer: addStudentReducer,
//   findStudentReducer: findStudentReducer,
// });
export default studentsReducer;
// const crudReducer = combineReducers({
//   students: studentsReducer,
//   addStudentReducer: addStudentReducer,
//   findStudentReducer: findStudentReducer,
// });
// export default crudReducer;
