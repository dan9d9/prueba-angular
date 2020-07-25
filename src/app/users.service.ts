import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { User } from './shared/user.model';
import { token, baseURL } from './config';
import { MataGatosService } from './header/mataGatos.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  allUsersChanged = new EventEmitter<{
    users: User[];
    changedUser: User | null;
    pageCount: number | null;
    currentPage: number | null;
  }>();
  selectedUserChanged = new EventEmitter<User>();
  searchedUsersChanged = new EventEmitter<{
    users: User[];
    pageCount: number;
    currentPage: number;
    searchField: string;
  }>();

  private allUsers: User[] = [];
  private selectedUser: User;
  private searchedUsers: User[] = [];
  private pageCount: number;
  private currentPage: number;

  constructor(
    private http: HttpClient,
    private mataGatosService: MataGatosService
  ) {}

  changeSelectedUser(user: User) {
    this.selectedUser = user;
    this.selectedUserChanged.emit(this.selectedUser);
  }

  fetchUsers(page: number) {
    this.http
      .get<{ _meta: any; result: User[] }>(`${baseURL}/users?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe((responseData) => {
        console.log(responseData);
        this.mataGatosService.killCat();

        this.currentPage = responseData._meta.currentPage;
        this.pageCount = responseData._meta.pageCount;
        this.allUsers = [...this.allUsers, ...responseData.result];
        this.allUsersChanged.emit({
          users: this.allUsers.slice(),
          changedUser: null,
          pageCount: this.pageCount,
          currentPage: this.currentPage,
        });
      });
  }

  fetchSingleUser(id: string) {
    this.http
      .get<{ _meta: {}; result: User }>(`${baseURL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe((responseData) => {
        this.mataGatosService.killCat();

        const changedUser = { ...responseData.result };
        const thisUserIdx = this.allUsers.findIndex((user) => user.id === id);

        this.allUsers[thisUserIdx] = { ...changedUser };

        this.allUsersChanged.emit({
          users: this.allUsers.slice(),
          changedUser,
          pageCount: null,
          currentPage: null,
        });
      });
  }

  fetchSearchedUsers(searchField: string, page: number) {
    this.http
      .get<{ _meta: any; result: User[] }>(
        `${baseURL}/users?first_name=${searchField}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .subscribe((responseData) => {
        this.pageCount = responseData._meta.pageCount;
        this.currentPage = page;
        if (page === 1) {
          this.searchedUsers = [...responseData.result];
        } else {
          this.searchedUsers = [...this.searchedUsers, ...responseData.result];
        }

        this.searchedUsersChanged.emit({
          users: this.searchedUsers,
          pageCount: this.pageCount,
          currentPage: this.currentPage,
          searchField,
        });
        console.log(responseData);
      });
  }

  getSelectedUser(): User {
    return { ...this.selectedUser };
  }
}
