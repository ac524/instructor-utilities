import {
    /**
     * TOPBAR ACTIONS
     */
    SET_TOPBAR,

    /**
     * CLASSROOM ACTIONS
     */
    SET_CLASSROOM,

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
    REMOVE_STUDENT,

    /**
     * STUDENT MODAL ACTIONS
     */
    EDIT_STUDENT,
    SET_STUDENT_FEED,
    ADD_STUDENT_FEED_ITEM,
    ADD_STUDENT_FEED_ITEMS, ADD_STUDENTS
} from "./actionsNames";

export default {
    /**
     * TOPBAR VIEW ACTIONS
     */
    [SET_TOPBAR]: ( state, payload ) => ({ ...state, topbar: payload }),

    /**
     * CLASSROOM ACTIONS
     */
    [SET_CLASSROOM]: ( state, payload ) => ({ ...state, classroom: payload }),

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
    })
}