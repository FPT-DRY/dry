import { UserResponse } from '@features/authentication/model/user';
import { http } from '@lib/http';

export default class UserService {
  static async getUserById(id: string) {
    return await http('GET')<UserResponse>(`/api/users/${id}`);
  }
}
