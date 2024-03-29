import axios from "axios";

class API {
  axios;

  constructor() {
    this.axios = axios.create();
  }

  setHeader(name, value) {
    if (value) this.axios.defaults.headers.common[name] = value;
    else delete this.axios.defaults.headers.common[name];
  }

  /**
   * Classroom Routes
   */

  async getClassroom(roomId) {
    return this.axios.get(`/api/rooms/${roomId}`);
  }

  async getClassroomPerms(roomId) {
    return this.axios.get(`/api/rooms/${roomId}/permissions`);
  }

  async updateClassroom(roomId, data) {
    return this.axios.patch(`/api/rooms/${roomId}`, data);
  }

  async createClassroom(data) {
    return this.axios.post(`/api/rooms/`, data);
  }

  /**
   * Invite Routes
   */

  async createInvite(roomId, data) {
    return this.axios.post(`/api/invites/${roomId}`, data);
  }

  async deleteInvite(roomId, inviteId) {
    return this.axios.delete(`/api/invites/${roomId}/${inviteId}`);
  }

  async acceptInvite(token) {
    return this.axios.post(`/api/invites/${token}/accept`);
  }

  async getInviteEmail(token) {
    return this.axios.get(`/api/invites/${token}/email`);
  }

  async registerInvite(token, data) {
    return this.axios.post(`/api/invites/${token}/register`, data);
  }

  /**
   * Student Routes
   */

  async createStudent(options) {
    return this.axios.post(`/api/students`, options);
  }

  async updateStudent(studentId, update) {
    return this.axios.patch(`/api/students/${studentId}`, update);
  }

  async updateStudents(roomId, updates) {

    return this.axios.patch(`/api/students`, {
      roomId,
      students: updates
    });
    
  }

  async removeStudent(studentId) {
    console.log(studentId);

    return this.axios.delete(`/api/students/${studentId}`);
  }

  /**
   * Feed Routes
   */

  async getFeed(feedId) {
    return this.axios.get(`/api/feeds/${feedId}`);
  }

  async getFeedItems(feedId) {
    return this.axios.get(`/api/feeds/${feedId}/items`);
  }

  async createComment(feedId, data) {
    return this.axios.post(`/api/feeds/comment`, {
      feedId,
      ...data,
    });
  }

  async createElevate(feedId) {
    return this.axios.post(`/api/feeds/elevate`, { feedId });
  }

  async deleteInvite( roomId, inviteId ) {

      return this.axios.delete( `/api/invites/${roomId}/${inviteId}` );

  }

  async acceptInvite( token ) {

      return this.axios.post( `/api/invites/${token}/accept` );

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

  async updateStudent( studentId, update ) {

      return this.axios.patch( `/api/students/${studentId}`, update );

  }

  async removeStudent( studentId ) {

      console.log( studentId );

      return this.axios.delete( `/api/students/${studentId}` );

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

      return this.axios.post( `/api/feeds/comment`, {
          feedId,
          ...data
        } );

  }

  async updateComment( entryId, data ) {

      return this.axios.patch( `/api/feeds/comment/${entryId}`, data );

  }

  async deleteComment( entryId ) {

      return this.axios.delete( `/api/feeds/comment/${entryId}` );

  }

  async createElevate( feedId ) {

      return this.axios.post( `/api/feeds/elevate`, { feedId } );

  }

  async createDeelevate( feedId ) {

      return this.axios.post( `/api/feeds/deelevate`, { feedId } );

  }

  /**
   * App Routes
   */

  async installApp( room, type ) {

      return this.axios.post( `/api/apps`, { room, type } );

  }

  async getApp( roomId, type ) {

      return this.axios.get( `/api/apps/${type}/${roomId}` );

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

  async register( userData ) {

      return this.axios.post("/api/register", userData);

  }

  async validate( token ) {

      return this.axios.post(`/api/validate-email/${token}`);

  }

  async resendValidation( data ) {

      return this.axios.post("/api/validate-email/resend", data);

  }

  /**
   * App Routes
   */

  async installApp(room, type) {
    return this.axios.post(`/api/apps`, { room, type });
  }

  async getApp(roomId, type) {
    return this.axios.get(`/api/apps/${type}/${roomId}`);
  }

  async updateApp(roomId, type, data) {
    return this.axios.patch(`/api/apps/${type}/${roomId}`, data);
  }

  async getAppTypes() {
    return this.axios.get("/api/apps/types");
  }

  /**
   * User Routes
   */

  async updateUser(data) {
    return this.axios.patch("/api/user", data);
  }

  async userRoomnames() {
    return this.axios.get("/api/user/rooms/short");
  }

  async userLeaveRoom(roomId) {
    return this.axios.delete(`/api/user/rooms/${roomId}/leave`);
  }

  async userArchiveRoom(roomId) {
    return this.axios.delete(`/api/user/rooms/${roomId}/archive`);
  }

  /**
   * Authentication Routes
   */

  async login(userData) {
    return this.axios.post("/api/login", userData);
  }

  async authenticated() {
    return this.axios.post("/api/authenticated");
  }

  async register(userData) {
    return this.axios.post("/api/register", userData);
  }

  async validate(token) {
    return this.axios.post(`/api/validate-email/${token}`);
  }

  async resendValidation(data) {
    return this.axios.post("/api/validate-email/resend", data);
  }
}

export default new API();