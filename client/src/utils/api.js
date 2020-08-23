import axios from "axios";

class API {

    configured = null;

    setConfiguration( config ) {
        this.configured = config ? axios.create( config ) : null;
    }

    get axios() {
        return this.configured || axios;
    }

    async getStudents() {

        return this.axios.get("https://randomuser.me/api/?results=60&nat=us");

    }

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