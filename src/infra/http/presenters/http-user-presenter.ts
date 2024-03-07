import { User } from "@/domain/blog/enterprise/entities/user";

export class UserPresenter {
  // ou static present()
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      userName: user.userName,
      password: user.password,
    };
  }
}
