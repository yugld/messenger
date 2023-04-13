import BaseAPI from './BaseAPI';
import {
  SearchUserData, ChangePasswordData, ChangeUserData, User,
} from './types';

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  change(data: ChangeUserData): Promise<User> {
    return this.http.put('/profile', data);
  }

  changeAvatar(formData: FormData) {
    return this.http.put('/profile/avatar', formData);
  }

  changePassword(data: ChangePasswordData) {
    return this.http.put('/password', data);
  }

  searchUser(data: SearchUserData): Promise<User[]> {
    return this.http.post('/search', data);
  }

  create = undefined;

  read = undefined;

  delete = undefined;

  update = undefined;
}

export const API = new UserAPI();
