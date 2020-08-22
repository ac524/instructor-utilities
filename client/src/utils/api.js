import axios from "axios";

class API {

    async getStudents() {

        return axios.get("https://randomuser.me/api/?results=60&nat=us");

    }

    async login( userData ) {

        return axios.post("/api/login", userData);

    }

    async authenticated() {

        return axios.post("/api/authenticated");

    }

    async register( userData ) {

        return axios.post("/api/register", userData);

    }

}

export default new API();