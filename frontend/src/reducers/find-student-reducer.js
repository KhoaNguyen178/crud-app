import { FIND_STUDENT_SUCCESS } from "../actionTypes";
const initialState = {
  students: {
    firstName: "",
    lastName: "",
    middleName: "",
    dob: "",
    major: "",
  },
};
const findStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_STUDENT_SUCCESS:
      return {
        students: action.payload,
      };
    default:
      return state;
  }
};
export default findStudentReducer;
