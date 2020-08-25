import { useDashboardContext, getDashboardAction as gda } from ".";
import { REMOVE_STUDENT } from "./actions";

/**
 * STUDENT GETTERS
 */
export const useRemoveStudent = () => {

    const [ ,dispatch ] = useDashboardContext();

    return (studentId) => dispatch(gda( REMOVE_STUDENT, studentId));

}