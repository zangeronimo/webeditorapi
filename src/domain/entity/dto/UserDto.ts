import { User } from "../User";

export class UserDto {
  public Id: string;
  public Name: string;
  public Email: string;

  constructor(user: User) {
    this.Id = user.id;
    this.Name = user.name;
    this.Email = user.email;
  }
}
