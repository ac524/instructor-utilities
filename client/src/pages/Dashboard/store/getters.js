import { useDashboardContext } from ".";

/**
 * STUDENT GETTERS
 */
export const useGetStudent = () => {

    const [ { students } ] = useDashboardContext();

    return ( targetId ) => {
        return students.find( ({ _id }) => _id = targetId );
    };

}