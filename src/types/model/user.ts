import { autoImplement } from '@lib/helper';

interface IUser {
  id?: string;
  username: string;
  password: string;
  name: string;
  email: string;
  emailVerified?: Date | string;
  image?: string;
}

export class UserUpsertRequest extends autoImplement<IUser>() {
  constructor(user: any) {
    super();
    this.username = user.username;
    this.password = user.password;
    this.name = user.name;
    this.email = user.email;
    this.emailVerified = user.emailVerified;
    this.image = user.image;
  }
}

export class UserResponse extends autoImplement<IUser>() {
  constructor(user: any) {
    super();
    this.id = user.id;
    this.username = user.username;
    this.name = user.name;
    this.email = user.email;
    this.emailVerified = user.emailVerified;
    this.image = user.image;
  }
}
