import axios from "axios";

class API {

    async getStudents() {

        return axios.get("https://randomuser.me/api/?results=60&nat=us");

    }

    async login( userData ) {

        return await axios.post("/api/login", userData);

    }

}

export default new API();