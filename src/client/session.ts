import { ref, type Ref } from "vue";

export class Session {
  user: Ref<object> = ref({});
  private static session?: Session;
  isAuthenticated: Ref<boolean> = ref(false);

  static getSessionInstance() {
    if (Session.session == null) {
      Session.session = new Session();
    }
    return Session.session;
  }


}
