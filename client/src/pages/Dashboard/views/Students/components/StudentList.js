import React from "react";

import { Columns, Card } from "react-bulma-components";

import { StudentCard } from "../../../components/StudentCard";
import { useStudentSort, useStudentGroups } from "../../../utils/student";

function StudentList( { sort, groupBy, search } ) {

    const groupedStudents = useStudentGroups( groupBy );
    const studentSort = useStudentSort( sort );
    const studentFilter = student => !search || student.name.toLowerCase().includes( search );

    if( !groupedStudents.length ) return null;

    const sizes = {
        tablet: {size: 'one-third'},
        desktop: {size: 'one-quarter'},
        widescreen: {size: 'one-fifth'}
    }

    return (
        <Columns className="is-multiline student-list">
            {
                groupedStudents[0].group.key === "default"

                ? groupedStudents[0].entries.filter( studentFilter ).sort( studentSort ).map(student => {
                    return (
                        <Columns.Column key={student._id} {...sizes} className="has-filled-content">
                            <StudentCard student={student} />
                        </Columns.Column>
                    )
                })

                : groupedStudents.map( ({ group, entries }) => (
                        <Columns.Column key={group.key} {...sizes}>
                            <Card className={`is-${group.color} is-light w-100 has-shadow`}><Card.Content>{group.label}</Card.Content></Card>
                            {entries.filter( studentFilter ).sort( studentSort ).map( student => <StudentCard key={student._id} student={student} className="mt-4" /> )}
                        </Columns.Column>
                ) )
            
            }
        </Columns>
    )

}

export default StudentList;