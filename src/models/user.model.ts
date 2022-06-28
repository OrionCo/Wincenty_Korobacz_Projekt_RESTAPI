export namespace UserModel {
  export interface UserData {
    email?: string;
  }

  export class User implements UserData {
    email?: string;

    constructor(config: UserData) {
      this.email = config.email;
    }
  }
}
