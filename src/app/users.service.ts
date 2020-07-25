import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { User } from './shared/user.model';
import { token } from './config';
import { MataGatosService } from './header/mataGatos.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  allUsersChanged = new EventEmitter<User[]>();
  currentUserChanged = new EventEmitter<User>();

  private allUsers: User[] = [];
  private currentUser: User;

  constructor(
    private http: HttpClient,
    private mataGatosService: MataGatosService
  ) {}

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
        this.allUsersChanged.emit(this.allUsers.slice());
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

        const thisUserIdx = this.allUsers.findIndex((user) => user.id === id);

        this.currentUser = { ...responseData.result };
        this.allUsers[thisUserIdx] = this.currentUser;

        this.currentUserChanged.emit({ ...this.currentUser });
        this.allUsersChanged.emit(this.allUsers.slice());
      });
  }

  getAllUsers() {
    return this.allUsers.slice();
  }

  getCurrentUser() {
    return { ...this.currentUser };
  }
}
