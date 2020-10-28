import axios from "axios";

const baseUrl = "https://api.github.com"

export default {
    getUser( user ) {
        return axios.get( `${baseUrl}/users/${user}` );
    },
    getRepoContributors( owner, repo ) {
        return axios.get( `${baseUrl}/repos/${owner}/${repo}/contributors` );
    }
}