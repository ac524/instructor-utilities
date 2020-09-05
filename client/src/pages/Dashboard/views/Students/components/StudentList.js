import React from "react";

import { Columns } from "react-bulma-components";

import {  useStudents } from "pages/Dashboard/store";
import { StudentCard } from "pages/Dashboard/components/StudentCard";

function StudentList() {

    const students = useStudents();

    const sizes = {
        tablet: {size: 'one-third'},
        desktop: {size: 'one-quarter'},
        widescreen: {size: 'one-fifth'}
    }

    return (
        <Columns className="is-multiline student-list">
            {students.map(student => {
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