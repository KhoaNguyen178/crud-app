import { ADD_STUDENT_SUCCESS } from "../actionTypes";

// needed, cuz default state is false, not null
const addStudentReducer = (state = false, action) => {
  switch (action.type) {
    case ADD_STUDENT_SUCCESS:
      return true;
    default:
      return state;
  }
};
export default addStudentReducer;
