import { useEffect, useState } from "react";
import { useStudents, useStaff } from "../store";

export const priorityLevels = [
    {
        key: "high",
        label: "High",
        test: level => level > 7,
        color: "danger"
    },
    {
        key: "mid",
        label: "Mid",
        test: level => level <= 7 && level >=4,
        color: "warning"
    },
    {
        key: "low",
        label: "Low",
        test: level => level < 4,
        color: "primary"
    }
];

export const studentGroupings = [
    {
        name: "Priority",
        key: "priority",
        prop: "priorityLevel",
        groups: priorityLevels
    }
]

export const usePriorityLevel = (level) => priorityLevels.find( priorityLevel => !priorityLevel.test || priorityLevel.test(level) );

export const useStudentGroupings = () => {

    const staff = useStaff();
    const [groupings, setGroupings] = useState([]);

    useEffect(() => {
        
        setGroupings([
            {
                name: "Priority",
                key: "priority",
                icon: "exclamation-circle",
                prop: "priorityLevel",
                groups: priorityLevels
            },
            {
                name: "Staff",
                key: "staff",
                icon: "user-friends",
                prop: "assignedTo",
                groups: staff.map( member => ({
                    key: member._id,
                    label: member.user.name,
                    test: assignedTo => assignedTo === member._id,
                    color: "primary"
                }) )
            }
        ]);

    }, [staff, setGroupings]);

    return groupings;

}

export const useStudentGroups = ( groupBy ) => {

    const students = useStudents();
    const studentGroupings = useStudentGroupings();
    const [ studentGroups, setStudentGroups ] = useState([]);

    useEffect(() => {

        const grouping = studentGroupings.find( group => group.key === groupBy ) || {
            name: "Default",
            key: "default",
            groups: [{ key: "default" }]
        };

        const studentsByGroup = students.reduce( (byGroup, student) => {

            byGroup[ grouping.groups.find( group => {
    
                if( !group.test ) return true;
    
                return grouping.prop ? group.test(student[grouping.prop]) : group.test(student);
    
            } ).key ].push(student);

            return byGroup;
    
        }, Object.fromEntries( grouping.groups.map( ({key}) => [ key, [] ] ) ) );

        setStudentGroups( grouping.groups.map( (group) => ({ group, entries: studentsByGroup[group.key] }) ) );

    }, [studentGroupings, students, groupBy, setStudentGroups])

    return studentGroups;

}

export const useStudentSort = (sort) => {

    const [ sortBy, sortOrder ] = sort.split(":");

    return ( studentA, studentB ) => {

        if( studentA[sortBy] > studentB[sortBy] ) return sortOrder === "asc" ? 1 : -1;

        if( studentA[sortBy] < studentB[sortBy] ) return sortOrder === "asc" ? -1 : 1;

        return 0;

    }

}