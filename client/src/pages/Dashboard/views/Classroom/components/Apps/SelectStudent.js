import { useState } from "react";

import {
    Button,
    Tag,
    Columns,
    Heading,
    Form as FormCollection
} from "react-bulma-components";

import Icon from "components/Icon";
import { useStudents } from "pages/Dashboard/store";

const { Column } = Columns;

const { Input } = FormCollection;

const mapStudentId = ({_id}) => _id;

const SelectStudent = ( { data, setData } ) => {

    const { selected, disabled } = data;
    const students = useStudents();
    const [ showStudents, setShowStudents ] = useState();
    const [ search, setSearch ] = useState("");
    const searchSanitized = search.trim().toLowerCase();
    // const [ selected, setSelected ] = useState([]);

    const setSelected = selected => setData({ ...data, selected });
    const setDisabled = disabled => setData({ ...data, disabled });
    
    const enabledStudentIds = students.filter(({_id}) => !disabled.includes(_id)).map( mapStudentId );

    const isComplete = selected.length === enabledStudentIds.length;

    const selectedStudent = selected.length

        ? ( students.find( ({_id}) => _id === selected[selected.length-1] ) )

        : false;

    const prevStudent = selected.length > 1

        ? ( students.find( ({_id}) => _id === selected[selected.length-2] ) )

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

        if( !enabledStudentIds.length ) return;

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

    const disableAllStudents = () => {

        setData({
            ...data,
            disabled: [ ...students.map( mapStudentId ) ],
            selected: []
        });

    }

    const enableAllStudents = () => {

        setData({
            ...data,
            disabled: []
        });

    }

    const unselectAllStudents = () => {

        setData({
            ...data,
            selected: []
        });

    }

    const enableStudent = studentId => setDisabled( disabled.filter( disabledId => disabledId !== studentId ) );

    const disableCurrent = () => disableStudent( selectedStudent._id );

    const setIsSelected = student => ({ ...student, isSelected: selected.includes(student._id) });

    const isSearchMatch = name => !searchSanitized || name.toLowerCase().includes( searchSanitized );

    return (
        <div>
            <div style={{maxWidth:"680px",margin:"0 auto"}}>
                <div className="is-flex mb-4">
                    <p>
                        <Button className="mb-2" onClick={selectPrevious} disabled={!selected.length}>
                            <Icon icon={['far','arrow-alt-circle-left']} /> <span>Prev</span>
                        </Button>
                        { prevStudent && <span className="is-block has-text-grey" style={{whiteSpace:"nowrap",fontSize:".9em"}}><strong>Prev:</strong> {prevStudent.name}</span> }
                    </p>
                    <p className="ml-auto has-text-right">
                        <Button className="mb-2 is-light has-border-1" color={ isComplete ? "success" : "primary" } onClick={selectNext} disabled={!enabledStudentIds.length}>
                            <span>{ isComplete ? "Restart" : "Next" }</span> <Icon icon={['far','arrow-alt-circle-right']} />
                        </Button>
                        <span className="is-block has-text-grey" style={{whiteSpace:"nowrap",fontSize:".9em"}}>{selected.length} out of {enabledStudentIds.length} selected</span>
                    </p>
                </div>
                <Tag className="mb-4 is-light is-radiusless w-100" size="large" color="primary" style={{flexGrow:1}}>
                    { selectedStudent ? ( selectedStudent.name ) : "No Selection" }
                </Tag>
                <p className="is-flex mb-4">
                    <Button size="small" onClick={()=>setShowStudents(!showStudents)}>
                        <span>View Student List</span>
                        <Icon icon="angle-down" />
                    </Button>
                    <Button disabled={!selectedStudent} className="ml-auto" size="small" onClick={disableCurrent}>
                        <span>Disable Current</span>
                        <Icon icon={["far","eye-slash"]} />
                    </Button>
                </p>
                <p className="is-flex">
                    <Button size="small" onClick={unselectAllStudents} disabled={!selected.length}>
                        <span>Reset Select</span>
                    </Button>
                    <Button className="ml-auto" size="small" onClick={disableAllStudents}>
                        <span>Disable All</span>
                        <Icon icon={["far","eye-slash"]} />
                    </Button>
                    <Button className="ml-2" size="small" onClick={enableAllStudents}>
                        <span>Enable All</span>
                        <Icon icon={["far","eye"]} />
                    </Button>
                </p>
            </div>
            {
                showStudents
                    ? (
                        <div className="mt-4">
                            <hr />
                            <div>
                                <Input
                                    className="is-fullwidth"
                                    type="text"
                                    value={search}
                                    placeholder="Search By Name"
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{maxWidth: "300px"}}
                                />
                            </div>
                            <Columns className="mt-4 mx-0 is-grid">
                                {students.filter(({_id, name}) => !disabled.includes(_id) && isSearchMatch(name)).map( setIsSelected ).map( student => (
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
                                            {students.filter(({_id, name}) => disabled.includes(_id)  && isSearchMatch(name)).map( student => (
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