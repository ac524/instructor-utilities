import axios from "axios";

class API {

    configured = null;

    setConfiguration( config ) {
        this.configured = config ? axios.create( config ) : null;
    }

    get axios() {
        return this.configured || axios;
    }

    async getClassroom() {

        return new Promise(resolve => {
            resolve({
                data: {
                    _id: 1,
                    name: "My First Classroom",
                    staff: [
                        {
                            _id: 1,
                            role: "instructor",
                            user: {
                                _id: 1,
                                name: "Anthony Brown",
                                email: "anthony@myclassroom.com",
                                github: "ac524"
                            }
                        },
                        {
                            _id: 2,
                            role: "ta",
                            user: {
                                _id: 2,
                                name: "Tom Lam",
                                email: "tom@myclassroom.com"
                            }
                        },
                        {
                            _id: 3,
                            role: "ta",
                            user: {
                                _id: 3,
                                name: "Spencer Hirata",
                                email: "staff@myclassroom.com"
                            }
                        },
                    ],
                    students: [
                        {
                            _id: 1,
                            name: "Sue Watts",
                            priorityLevel: 2,
                            assignedTo: 2
                        },
                        {
                            _id: 2,
                            name: "Anita Hudson",
                            priorityLevel: 5,
                            assignedTo: 2
                        },
                        {
                            _id: 3,
                            name: "Terra Bennett",
                            priorityLevel: 9,
                            assignedTo: 3
                        },
                        {
                            _id: 4,
                            name: "Alan Ramirez",
                            priorityLevel: 6,
                            assignedTo: 2
                        },
                        {
                            _id: 5,
                            name: "Doris Lee",
                            priorityLevel: 8,
                            assignedTo: 3
                        }
                    ]
                }
            });
        })

    }

    /**
     * Student View Routes
     */
    async getStudents() {

        // return this.axios.get("https://randomuser.me/api/?results=60&nat=us");

        return new Promise((resolve) => {
            resolve( {
                data: [
                    {
                        _id: 1,
                        name: "Sue Watts",
                        priorityLevel: 0
                    },
                    {
                        _id: 2,
                        name: "Anita Hudson",
                        priorityLevel: 0
                    },
                    {
                        _id: 3,
                        name: "Terra Bennett",
                        priorityLevel: 0
                    },
                    {
                        _id: 4,
                        name: "Alan Ramirez",
                        priorityLevel: 0
                    },
                    {
                        _id: 5,
                        name: "Doris Lee",
                        priorityLevel: 0
                    }
                ]
            } );
        });

    }

    /**
     * Authentication Routes
     */

    async login( userData ) {

        return this.axios.post("/api/login", userData);

    }

    async authenticated() {

        return this.axios.post("/api/authenticated");

    }

    async register( userData ) {

        return this.axios.post("/api/register", userData);

    }

}

export default new API();