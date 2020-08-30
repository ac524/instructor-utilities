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

        return this.axios.get( "/api/rooms/5f4ac8bc492845084bdd36a5" );

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