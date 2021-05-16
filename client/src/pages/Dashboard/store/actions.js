import {
    /**
     * TOPBAR ACTIONS
     */
    SET_TOPBAR,

    /**
     * CLASSROOM ACTIONS
     */
    SET_CLASSROOM,
    SET_PERMISSIONS,
    SET_CR_AND_PERMS,

    /**
     * STAFF ACTIONS
     */
    ADD_STAFF,
    REMOVE_STAFF,

    /**
     * INVITE ACTIONS
     */
    ADD_INVITE,
    DELETE_INVITE,
    
    /**
     * APP ACTIONS
     */
    SET_MANAGE_APPS,
    ADD_APP,

    /**
     * STUDENT VIEW ACTIONS
     */
    SET_STUDENTS,
    ADD_STUDENT,
    UPDATE_STUDENT,
    UPDATE_STUDENTS,
    SELECT_STUDENT,
    UNSELECT_STUDENT,
    SELECT_STUDENTS,
    UNSELECT_STUDENTS,
    UNSELECT_ALL_STUDENTS,
    REMOVE_STUDENT,

    /**
     * STUDENT MODAL ACTIONS
     */
    EDIT_STUDENT,
    SET_STUDENT_FEED,
    ADD_STUDENT_FEED_ITEM,
    ADD_STUDENT_FEED_ITEMS,
    UPDATE_STUDENT_FEED_ITEM,
    UPDATE_STUDENT_FEED_ITEMS,
    DELETE_STUDENT_FEED_ITEM,
    DELETE_STUDENT_FEED_ITEMS,
    ADD_STUDENTS
} from "./actionsNames";

const makePermMap = permissions => new Map( permissions.map( perm => [perm, 1] ) );
const makeDocIdMap = docList => new Map( docList.map( doc => [ doc._id, doc ] ) );
const extendClassroom = room => ({
    ...room,
    // React application props
    selectedStudents: []
})

export default {
    /**
     * TOPBAR VIEW ACTIONS
     */
    [SET_TOPBAR]: ( state, topbar ) => ({ ...state, topbar }),

    /**
     * CLASSROOM ACTIONS
     */
    [SET_CLASSROOM]: ( state, classroom ) => ({
        ...state,
        classroom: extendClassroom( classroom )
    }),

    [SET_PERMISSIONS]: ( state, permissions ) => ({ ...state, permissions: makePermMap( permissions ) }),

    [SET_CR_AND_PERMS]: ( state, { classroom, permissions } ) => ({
        ...state,
        classroom: extendClassroom( classroom ),
        permissions: makePermMap( permissions )
    }),

    /**
     * STAFF ACTIONS
     */
    [ADD_STAFF]: ( state, payload ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            staff: [ ...state.classroom.staff, payload ]
        }
    }),
    [REMOVE_STAFF]: ( state, payload ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            staff: state.classroom.staff.filter( member => member._id !== payload )
        }
    }),

    /**
     * INVITE ACTIONS
     */
    [ADD_INVITE]: ( state, payload ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            invites: [ ...state.classroom.invites, payload ]
        }
    }),
    [DELETE_INVITE]: ( state, payload ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            invites: state.classroom.invites.filter( invite => invite._id !== payload )
        }
    }),

    /**
     * APP ACTIONS
     */
    [SET_MANAGE_APPS]: ( state, payload ) => ({ ...state, isManagingApps: payload }),
    [ADD_APP]: ( state, payload ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            apps: [ ...state.classroom.apps, payload ]
        }
    }),

    /**
     * STUDENT VIEW ACTIONS
     */
    [SET_STUDENTS]: ( state, payload ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            students: payload
        }
    }),
    [ADD_STUDENT]: ( state, payload ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            students: [ ...state.classroom.students, payload ]
        }
    }),
    [ADD_STUDENTS]: ( state, payload ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            students: [ ...state.classroom.students, ...payload ]
        }
    }),
    [UPDATE_STUDENT]: ( state, payload ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            students: state.classroom.students.map( student => student._id === payload._id ? { ...student, ...payload } : student )
        }
    }),
    [UPDATE_STUDENTS]: ( state, students ) => {
        const updateMap = new Map( students.map(({_id,...updates})=>[_id,updates]) );
        return {
            ...state,
            classroom: {
                ...state.classroom,
                students: state.classroom.students.map( ({_id,...student}) => updateMap.has( _id ) ? { _id, ...student, ...updateMap.get( _id ) } : student )
            }
        }
    },
    [SELECT_STUDENT]: ( state, studentId ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            // Maintain an independent list of selected student ids
            selectedStudents: [ ...state.classroom.selectedStudents, studentId ]
        }
    }),
    [UNSELECT_STUDENT]: ( state, studentId ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            // Maintain an independent list of selected student ids
            selectedStudents: state.classroom.selectedStudents.filter((itemId)=>itemId!==studentId)
        }
    }),
    [SELECT_STUDENTS]: ( state, studentIds ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            selectedStudents: [ ...state.classroom.selectedStudents, ...studentIds ]
        }
    }),
    [UNSELECT_STUDENTS]: ( state, studentIds ) => {
        const removalMap = new Map(studentIds.map(id=>[id,id]));
        return {
            ...state,
            classroom: {
                ...state.classroom,
                selectedStudents: state.classroom.selectedStudents.filter((itemId)=>!removalMap.has(itemId))
            }
        };
    },
    [UNSELECT_ALL_STUDENTS]: ( state ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            selectedStudents: []
        }
    }),
    [REMOVE_STUDENT]: ( state, payload ) => ({
        ...state,
        classroom: {
            ...state.classroom,
            students: state.classroom.students.filter( student => student._id !== payload )
        }
    }),
    [EDIT_STUDENT]: ( state, payload ) => ({
        ...state,
        editStudent: payload
    }),
    [SET_STUDENT_FEED]: ( state, payload ) => ({
        ...state,
        studentFeed: payload
    }),
    [ADD_STUDENT_FEED_ITEM]: ( state, payload ) => ({
        ...state,
        studentFeed: [ ...state.studentFeed, payload ]
    }),
    [ADD_STUDENT_FEED_ITEMS]: ( state, payload ) => ({
        ...state,
        studentFeed: [ ...state.studentFeed, ...payload ]
    }),
    [UPDATE_STUDENT_FEED_ITEM]: ( state, entryToUpdate ) => ({
        ...state,
        studentFeed: state.studentFeed.map((thisEntry) => thisEntry._id === entryToUpdate._id ? entryToUpdate : thisEntry)
    }),
    [UPDATE_STUDENT_FEED_ITEMS]: ( state, itemsToUpdate ) => {

        console.log("UPDATE");

        const updateIdMap = makeDocIdMap(itemsToUpdate);

        return {
            ...state,
            studentFeed: state.studentFeed.map((item) => updateIdMap.has(item._id) ? updateIdMap.get(item._id) : item)
        }
    },
    [DELETE_STUDENT_FEED_ITEM]: ( state, entryToDelete ) => ({
        ...state,
        studentFeed: state.studentFeed.filter(({_id}) => _id !== entryToDelete._id)
    }),
    [DELETE_STUDENT_FEED_ITEMS]: ( state, entriesToDelete ) => {

        const deleteIdMap = makeDocIdMap(entriesToDelete);

        console.log("DELETE", deleteIdMap);

        return {
            ...state,
            studentFeed: state.studentFeed.filter(({_id}) => !deleteIdMap.has(_id))
        }
    },
}