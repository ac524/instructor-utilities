import { useDashboardContext } from ".";
import { useEffect, useState } from "react";

/**
 * STUDENT GETTERS
 */
export const useGetStudent = ( targetId ) => {

    const [ { students } ] = useDashboardContext();

    const [ student, setStudent ] = useState({});

    useEffect(() => {

        setStudent( students.find( ({ _id }) => _id === targetId ) || {} );

    }, [students, targetId]);

    return student;

}

export const useEditStudent = () => {

    const [ { editStudent } ] = useDashboardContext();

    return useGetStudent( editStudent );

}