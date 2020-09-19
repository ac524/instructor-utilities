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
 * ROOM GETTERS
 */
export const useClassroom = () => {

    const [ { classroom } ] = useDashboardContext();

    return classroom;

}

/**
 * STAFF GETTERS
 */
export const useStaff = () => {

    const [ { classroom: { staff } } ] = useDashboardContext();

    return staff;

}

export const useStaffMember = ( staffId ) => {

    const staff = useStaff();

    const [ staffMember, setStaffMember ] = useState({});

    useEffect(() => {

        setStaffMember( staff.find( ({ _id }) => _id === staffId ) || {} );

    }, [staff, staffId]);

    return staffMember;

}

/**
 * STUDENT GETTERS
 */
export const useStudents = () => {

    const [ { classroom: { students } } ] = useDashboardContext();

    return students;

}

export const useStudent = ( targetId ) => {

    const students = useStudents();

    const [ student, setStudent ] = useState({});

    useEffect(() => {

        setStudent( students.find( ({ _id }) => _id === targetId ) || {
            name: "",
            priorityLevel: 1,
            assignedTo: ""
        } );

    }, [students, targetId]);

    return student;

}

export const useEditStudent = () => {

    const [ { editStudent } ] = useDashboardContext();

    return useStudent( editStudent );

}

export const useAssignedStudents = ( staffId ) => {

    const students = useStudents();

    const [ assignedStudents, setAssignedStudents ] = useState([]);

    useEffect(() => {

        setAssignedStudents( students.filter( ({ assignedTo }) => assignedTo === staffId ) );

    }, [students, staffId]);

    return assignedStudents;

}