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

    /**
     * Classroom Routes
     */

    async getClassroom( roomId ) {

        return this.axios.get( `/api/rooms/${roomId}` );

    }

    async updateClassroom( roomId, data ) {

        return this.axios.patch( `/api/rooms/${roomId}`, data );

    }

    /**
     * Invite Routes
     */

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

    /**
     * Student Routes
     */

    async createStudent( options ) {

        return this.axios.post( `/api/students`, options );

    }

    async updateStudent( roomId, studentId, update ) {

        return this.axios.patch( `/api/students/${roomId}/${studentId}`, update );

    }

    async removeStudent( roomId, studentId ) {

        return this.axios.delete( `/api/students/${roomId}/${studentId}` );

    }

    /**
     * Feed Routes
     */

    async getFeed( feedId ) {

        return this.axios.get( `/api/feeds/${feedId}` );

    }

    async getFeedItems( feedId ) {

        return this.axios.get( `/api/feeds/${feedId}/items` );

    }

    async createComment( feedId, data ) {

        return this.axios.post( `/api/feeds/${feedId}/comments`, data );

    }

    async createElevate( feedId, data ) {

        return this.axios.post( `/api/feeds/${feedId}/elevate`, data );

    }

    async createDeelevate( feedId ) {

        return this.axios.post( `/api/feeds/${feedId}/deelevate` );

    }

    /**
     * App Routes
     */

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

    async userArchiveRoom( roomId ) {

        return this.axios.delete(`/api/user/rooms/${roomId}/archive`);

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