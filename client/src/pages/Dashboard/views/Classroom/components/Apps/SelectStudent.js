import React, { useState } from "react";

import {
    Button,
    Tag,
    Columns,
    Heading
} from "react-bulma-components";

import Icon from "components/Icon";
import { useStudents } from "pages/Dashboard/store";

const { Column } = Columns;

const SelectStudent = ( { data, setData } ) => {

    const { selected, disabled } = data;
    const students = useStudents();
    const [ showStudents, setShowStudents ] = useState();
    // const [ selected, setSelected ] = useState([]);

    const setSelected = selected => setData({ ...data, selected });
    const setDisabled = disabled => setData({ ...data, disabled });
    
    const enabledStudentIds = students.filter(({_id}) => !disabled.includes(_id)).map( ({_id}) => _id );
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

        const isListEnd = enabledStudentIds.length === selected.length;

        const unselected = isListEnd ? enabledStudentIds : enabledStudentIds.filter( id => !selected.includes(id) );

        const next = unselected[ Math.floor( Math.random() * unselected.length) ];

        setSelected( isListEnd ? [ next ] : [ ...selected, next ] );

    }

    const disableStudent = studentId => {

        const isSelected = selected.includes(studentId);

        if( !isSelected ) {
            setDisabled( [ ...disabled, studentId ] )
            return
        };

        setData({
            ...data,
            disabled: [ ...disabled, studentId ],
            selected: selected.filter( selectedId => selectedId !== studentId )
        });

    }

    const enableStudent = studentId => setDisabled( disabled.filter( disabledId => disabledId !== studentId ) );

    const disableCurrent = () => disableStudent( selectedStudent._id );

    const setIsSelected = student => ({ ...student, isSelected: selected.includes(student._id) });

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
            <p className="is-flex">
                <Button size="small" onClick={()=>setShowStudents(!showStudents)}>
                    <span>View Student List</span>
                    <Icon icon="angle-down" />
                </Button>
                <Button disabled={!selectedStudent} className="ml-auto" size="small" onClick={disableCurrent}>
                    <span>Disable Current</span>
                    <Icon icon={["far","eye-slash"]} />
                </Button>
            </p>
            {
                showStudents
                    ? (
                        <div>
                            <Columns className="mt-4 mx-0 is-grid">
                                {students.filter(({_id}) => !disabled.includes(_id)).map( setIsSelected ).map( student => (
                                    <Column key={student._id} size="half" className={"is-flex" + (student.isSelected ? " has-background-success-light" : "")} style={{alignItems:"center"}}>
                                        <Button className="mr-2 is-small" onClick={()=>toggleSelect(student._id)}>
                                            <Icon icon={student.isSelected ? "check" : ["far","square"]} />
                                        </Button>
                                        {student.name}
                                        <Button className="ml-auto is-small" onClick={()=>disableStudent(student._id)}>
                                            <Icon icon={["far", "eye"]} />
                                        </Button>
                                    </Column>
                                ))}
                            </Columns>
                            {
                                disabled.length
                                ? (
                                    <div>
                                        <Heading renderAs="h3" size={5} className="my-4">Disabled</Heading>
                                        <Columns className="mt-4 mx-0 is-grid">
                                            {students.filter(({_id}) => disabled.includes(_id)).map( student => (
                                                <Column key={student._id} size="half" className="is-flex" style={{alignItems:"center"}}>
                                                    {student.name}
                                                    <Button className="ml-auto is-small" onClick={()=>enableStudent(student._id)}>
                                                        <Icon icon={["far", "eye-slash"]} />
                                                    </Button>
                                                </Column>
                                            ))}
                                        </Columns>
                                    </div>
                                )
                                : null
                            }
                        </div>
                    )

                    : null
            }
        </div>
    );

}

export default SelectStudent;