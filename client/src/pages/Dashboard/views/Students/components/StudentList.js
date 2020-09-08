import React from "react";

import { Columns } from "react-bulma-components";

import { useStudents } from "../../../store";
import { StudentCard } from "../../../components/StudentCard";

function StudentList( { sort } ) {

    const students = useStudents();

    const [ sortBy, sortOrder ] = sort.split(":");

    const studentSort = ( studentA, studentB ) => {

        if( studentA[sortBy] > studentB[sortBy] ) return sortOrder === "asc" ? 1 : -1;

        if( studentA[sortBy] < studentB[sortBy] ) return sortOrder === "asc" ? -1 : 1;

        return 0;

    }

    const sizes = {
        tablet: {size: 'one-third'},
        desktop: {size: 'one-quarter'},
        widescreen: {size: 'one-fifth'}
    }

    return (
        <Columns className="is-multiline student-list">
            {students.sort( studentSort ).map(student => {
                return (
                    <Columns.Column key={student._id} {...sizes} className="has-filled-content">
                        <StudentCard student={student} />
                    </Columns.Column>
                )
            })}
        </Columns>
    )

}

export default StudentList;