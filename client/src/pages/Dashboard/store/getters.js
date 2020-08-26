import { useDashboardContext } from ".";
import { useEffect, useState } from "react";

/**
 * DASHBOARD GETTERS
 */
export const useDashboardDispatch = () => {
    
    const [ ,dispatch ] = useDashboardContext();

    return dispatch;

}

/**
 * TEAM GETTERS
 */
export const useStaff = () => {

    const [ { classroom: { staff } } ] = useDashboardContext();

    return staff;

}


/**
 * TEAM GETTERS
 */
export const useStudents = () => {

    const [ { classroom: { students } } ] = useDashboardContext();

    return students;

}

/**
 * STUDENT GETTERS
 */
export const useStudent = ( targetId ) => {

    const students = useStudents();

    const [ student, setStudent ] = useState({});

    useEffect(() => {

        setStudent( students.find( ({ _id }) => _id === targetId ) || {} );

    }, [students, targetId]);

    return student;

}

export const useEditStudent = () => {

    const [ { editStudent } ] = useDashboardContext();

    return useStudent( editStudent );

}