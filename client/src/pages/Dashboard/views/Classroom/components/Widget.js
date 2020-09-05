import React, { useState } from "react";

import {
    Button,
    Heading,
    Tag,
    Box,
    Columns
} from "react-bulma-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStudents } from "pages/Dashboard/store";

const { Column } = Columns;

const Widget = ( props ) => {

    const students = useStudents();
    const [ showStudents, setShowStudents ] = useState();
    const [ selected, setSelected ] = useState([]);
    
    const studentIds = students.map( ({_id}) => _id );
    const selectedStudent = selected.length

        ? ( students.find( ({_id}) => _id === selected[selected.length-1] ) )

        : false;

    const selectPrevious = () => {

        if(selected.length)

            setSelected( [ ...selected.slice(0, selected.length-1) ] );

    }

    const selectNext = () => {

        const unselected = students.length === selected.length ? [] : studentIds.filter( id => !selected.includes(id) );

        setSelected( [ ...selected, unselected[ Math.floor( Math.random() * unselected.length) ] ] );

    }

    return (
        <Box {...props}>
            <Heading>Select a Student</Heading>
            <div className="is-flex mb-4" style={{alignItems:"center"}}>
                <Button onClick={selectPrevious} disabled={!selected.length}>
                    <span className="icon">
                        <FontAwesomeIcon icon={['far','arrow-alt-circle-left']} />
                    </span>
                </Button>

                <Tag className="ml-auto is-light is-radiusless" size="large" color="primary" style={{flexGrow:1}}>
                    { selectedStudent ? ( selectedStudent.name ) : "No Selection" }
                </Tag>

                <Button className="ml-auto" onClick={selectNext}>
                    <span className="icon">
                        <FontAwesomeIcon icon={['far','arrow-alt-circle-right']} />
                    </span>
                </Button>
            </div>
            <p><Button size="small" onClick={()=>setShowStudents(!showStudents)}>
                <span>View Student List</span>
                <span className="icon">
                    <FontAwesomeIcon icon="angle-down" />
                </span>
            </Button></p>
            {
                showStudents
                    ? (
                        <Columns className="mt-4 mx-0 is-grid">
                            {students.map( student => (
                                <Column key={student._id} size="one-third">
                                    <input type="checkbox" checked={selected.includes(student._id)} className="mr-2" />
                                    {student.name}
                                </Column>
                            ))}
                        </Columns>
                    )

                    : null
            }
        </Box>
    )

}

export default Widget;