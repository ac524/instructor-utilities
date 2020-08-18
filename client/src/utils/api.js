import axios from "axios";

class API {

    async getStudents() {

        return axios.get("https://randomuser.me/api/?results=60&nat=us");

    }

}

export default new API();