import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { User } from './shared/user.model';
import { token } from './config';

@Injectable({ providedIn: 'root' })
export class UsersService {
  allUsersChanged = new EventEmitter<User[]>();
  currentUserChanged = new EventEmitter<User>();
  // userByPageChanged = new EventEmitter<Array<{ page: number; users: User[] }>>();

  private allUsers: User[] = [];
  // private usersByPage: Array<{ page: number; users: User[] }> = [];
  private currentUser: User;

  constructor(private http: HttpClient) {}

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
        this.allUsers = [...this.allUsers, ...responseData.result];
        this.allUsersChanged.emit(this.allUsers.slice());

        // const usersByPage = this.usersByPage.find(
        //   (userPage) => userPage.page === page
        // );
        // if (!usersByPage) {
        //   this.usersByPage.push({ page, users: [...responseData.result] });
        // } else {
        //   usersByPage.users = [...responseData.result];
        // }

        // console.log('after fetch', this.allUsers);
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

  // getUsersByPage(page) {
  //   const usersPage = this.usersByPage.find(
  //     (usersPage) => usersPage.page === page
  //   );
  //   return usersPage.users.slice();
  // }

  getCurrentUser() {
    return { ...this.currentUser };
  }
}
