import React from "react";

import Columns from "react-bulma-components/lib/components/columns";

import {  useStudents } from "pages/Dashboard/store";
import { StudentCard } from "pages/Dashboard/parts/StudentCard";

function StudentList() {

    const students = useStudents();

    return (
        <Columns className="is-multiline student-list">
            {students.map(student => {
                return (
                    <Columns.Column key={student._id} size="one-fifth" className="has-filled-content">
                        <StudentCard student={student} />
                    </Columns.Column>
                )
            })}
        </Columns>
    )

}

export default StudentList;