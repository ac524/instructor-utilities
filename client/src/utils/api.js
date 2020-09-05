import axios from "axios";

class API {

    configured = null;

    setConfiguration( config ) {
        this.configured = config ? axios.create( config ) : null;
    }

    get axios() {
        return this.configured || axios;
    }

    async getClassroom( roomId ) {

        return this.axios.get( `/api/rooms/${roomId}` );

    }

    async updateClassroom( roomId, update ) {

        return this.axios.patch( `/api/rooms/${roomId}`, update );

    }

    async createStudent( options ) {

        return this.axios.post( `/api/students`, options );

    }

    async updateStudent( studentId, update ) {

        return this.axios.patch( `/api/students/${studentId}`, update );

    }

    async removeStudent( studentId ) {

        return this.axios.delete( `/api/students/${studentId}` );

    }

    async installApp( studentId ) {

        return this.axios.delete( `/api/students/${studentId}` );

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