import React, { useState } from "react";

import {
    Button,
    Tag,
    Columns
} from "react-bulma-components";

import Icon from "../../../../../../components/Icon";
import { useStudents } from "../../../../store";

const { Column } = Columns;

const SelectStudent = ( { data: selected, setData: setSelected } ) => {

    const students = useStudents();
    const [ showStudents, setShowStudents ] = useState();
    // const [ selected, setSelected ] = useState([]);
    
    const studentIds = students.map( ({_id}) => _id );
    const selectedStudent = selected.length

        ? ( students.find( ({_id}) => _id === selected[selected.length-1] ) )

        : false;

    const toggleSelect = ( studentId ) => {

        const isSelected = selected.includes(studentId);

        isSelected

            ? setSelected( selected.filter( selectedId => selectedId !== studentId ) )

            : setSelected( [ ...selected, studentId ] );

    }

    const selectPrevious = () => {

        if(selected.length)

            setSelected( [ ...selected.slice(0, selected.length-1) ] );

    }

    const selectNext = () => {

        const isListEnd = studentIds.length === selected.length;

        const unselected = isListEnd ? studentIds : studentIds.filter( id => !selected.includes(id) );

        const next = unselected[ Math.floor( Math.random() * unselected.length) ];

        setSelected( isListEnd ? [ next ] : [ ...selected, next ] );

    }

    return (
        <div>
            <div className="is-flex mb-4" style={{alignItems:"center"}}>
                <Button onClick={selectPrevious} disabled={!selected.length}>
                    <Icon icon={['far','arrow-alt-circle-left']} />
                </Button>

                <Tag className="ml-auto is-light is-radiusless" size="large" color="primary" style={{flexGrow:1}}>
                    { selectedStudent ? ( selectedStudent.name ) : "No Selection" }
                </Tag>

                <Button className="ml-auto" onClick={selectNext}>
                    <Icon icon={['far','arrow-alt-circle-right']} />
                </Button>
            </div>
            <p><Button size="small" onClick={()=>setShowStudents(!showStudents)}>
                <span>View Student List</span>
                <Icon icon="angle-down" />
            </Button></p>
            {
                showStudents
                    ? (
                        <Columns className="mt-4 mx-0 is-grid">
                            {students.map( student => (
                                <Column key={student._id} size="one-third">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(student._id)}
                                        className="mr-2"
                                        onChange={() => toggleSelect(student._id)}
                                    />
                                    {student.name}
                                </Column>
                            ))}
                        </Columns>
                    )

                    : null
            }
        </div>
    );

}

export default SelectStudent;