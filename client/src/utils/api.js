import axios from "axios";

class API {

    axios;

    constructor() {

        this.axios = axios.create();

    }

    setHeader( name, value ) {

        if( value )

            this.axios.defaults.headers.common[name] = value;

        else

            delete this.axios.defaults.headers.common[name];

    }

    async getClassroom( roomId ) {

        return this.axios.get( `/api/rooms/${roomId}` );

    }

    async createInvite( roomId, data ) {

        return this.axios.post( `/api/rooms/${roomId}/invites`, data );

    }

    async deleteInvite( roomId, inviteId ) {

        return this.axios.delete( `/api/rooms/${roomId}/invites/${inviteId}` );

    }

    async acceptInvite( token ) {

        return this.axios.post( `/api/invites/${token}` );

    }

    async getInviteEmail( token ) {

        return this.axios.get( `/api/invites/${token}/email` );

    }

    async registerInvite( token, data ) {

        return this.axios.post( `/api/invites/${token}/register`, data );

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

    async installApp( roomId, type ) {

        return this.axios.post( `/api/apps`, { roomId, type } );

    }

    async getApp( roomId, type ) {

        return this.axios.post( `/api/apps/${type}/${roomId}` );

    }

    async updateApp( roomId, type, data ) {

        return this.axios.patch( `/api/apps/${type}/${roomId}`, data );

    }

    async getAppTypes() {

        return this.axios.get( "/api/apps/types" );

    }

    /**
     * User Routes
     */
    async updateUser( data ) {

        return this.axios.patch( "/api/user", data );

    }

    async userRoomnames() {

        return this.axios.get("/api/user/rooms/short");

    }

    async userLeaveRoom( roomId ) {

        return this.axios.delete(`/api/user/rooms/${roomId}/leave`);

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

    async subscribe() {

        return this.axios.post("/api/subscribe");

    }

    async register( userData ) {

        return this.axios.post("/api/register", userData);

    }

    async validate( token ) {

        return this.axios.post(`/api/validate/${token}`);

    }

    async resendValidation( data ) {

        return this.axios.post("/api/validate/resend", data);

    }

}

export default new API();