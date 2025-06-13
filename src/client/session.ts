export class Session {
  user?: object;
  private static session?: Session;

  static getSessionInstance() {
    if (Session.session == null) {
      Session.session = new Session();
    }
    return Session.session;
  }


}
