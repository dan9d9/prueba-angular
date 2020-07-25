import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { User } from './shared/user.model';
import { token } from './config';
import { MataGatosService } from './header/mataGatos.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  allUsersChanged = new EventEmitter<{
    users: User[];
    changedUser: User | null;
  }>();
  selectedUserChanged = new EventEmitter<User>();

  private allUsers: User[] = [];
  private selectedUser: User;

  constructor(
    private http: HttpClient,
    private mataGatosService: MataGatosService
  ) {}

  changeSelectedUser(user: User) {
    this.selectedUser = user;
    this.selectedUserChanged.emit(this.selectedUser);
  }

  fetchUsers(page) {
    this.http
      .get<{ _meta: {}; result: User[] }>(
        `https://gorest.co.in/public-api/users?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .subscribe((responseData) => {
        this.mataGatosService.killCat();

        this.allUsers = [...this.allUsers, ...responseData.result];
        this.allUsersChanged.emit({
          users: this.allUsers.slice(),
          changedUser: null,
        });
      });
  }

  fetchSingleUser(id) {
    this.http
      .get<{ _meta: {}; result: User }>(
        `https://gorest.co.in/public-api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .subscribe((responseData) => {
        this.mataGatosService.killCat();

        const changedUser = { ...responseData.result };
        const thisUserIdx = this.allUsers.findIndex((user) => user.id === id);

        this.allUsers[thisUserIdx] = { ...changedUser };

        this.allUsersChanged.emit({
          users: this.allUsers.slice(),
          changedUser,
        });
      });
  }

  getSelectedUser() {
    return { ...this.selectedUser };
  }
}
