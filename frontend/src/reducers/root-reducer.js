import { combineReducers } from "redux";
import studentsReducer from "./students-reducer";
import addStudentReducer from "./add-student-reducer";
import findStudentReducer from "./find-student-reducer";
import auth from "./auth-reducers";
import message from "./message-reducer";

const rootReducer = combineReducers({
  students: studentsReducer,
  addStudentReducer: addStudentReducer,
  findStudentReducer: findStudentReducer,
  auth,
  message,
});

export default rootReducer;
