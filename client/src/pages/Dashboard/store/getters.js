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

export const useStaffMember = memberId => {

    const staff = useStaff();

    return staff.find( member => member._id === memberId );

}

const staffByRoleReducer = (byRole, member) => {

    return byRole[member.role]

        ? { ...byRole, [member.role]: [ ...byRole[member.role], member ] }

        : { ...byRole, [member.role]: [ member ] };

}

export const useStaffByRole = () => {

    const staff = useStaff();
    const [ staffByRole, setStaffByRole ] = useState( staff.reduce(staffByRoleReducer, {}) );

    useEffect(() => {

        setStaffByRole( staff.reduce(staffByRoleReducer, {}) );

    }, [staff, setStaffByRole]);

    return staffByRole;

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