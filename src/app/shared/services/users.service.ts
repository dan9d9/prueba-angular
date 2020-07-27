import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { User } from '../user.model';
import { token } from '../../../config';
import { MataGatosService } from './mataGatos.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  allUsersChanged = new EventEmitter<{
    users: User[];
    searchedUsers: User[];
    changedUser: User | null;
    pageCount: number;
    currentPage: number;
    searchField: string;
  }>();
  selectedUserChanged = new EventEmitter<User>();

  private allUsers: User[] = [];
  private selectedUser: User;
  private searchedUsers: User[] = [];
  private searchField: string;
  private pageCount: number;
  private currentPage: number;
  private baseURL = 'https://gorest.co.in/public-api';

  constructor(
    private http: HttpClient,
    private mataGatosService: MataGatosService
  ) {}

  changeSelectedUser(user: User) {
    this.selectedUser = user;
    this.selectedUserChanged.emit(this.selectedUser);
  }

  fetchUsers(page: number) {
    this.searchField = '';
    this.http
      .get<{ _meta: any; result: User[] }>(
        `${this.baseURL}/users?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .subscribe((responseData) => {
        this.mataGatosService.killCat(`${this.baseURL}/users?page=${page}`);

        this.currentPage = responseData._meta.currentPage;
        this.pageCount = responseData._meta.pageCount;
        this.allUsers = [...this.allUsers, ...responseData.result];
        this.allUsersChanged.emit({
          users: this.allUsers.slice(),
          searchedUsers: this.searchedUsers,
          changedUser: null,
          pageCount: this.pageCount,
          currentPage: this.currentPage,
          searchField: this.searchField,
        });
      });
  }

  fetchSingleUser(id: string) {
    this.http
      .get<{ _meta: {}; result: User }>(`${this.baseURL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe((responseData) => {
        this.mataGatosService.killCat(`${this.baseURL}/users/${id}`);

        const changedUser = { ...responseData.result };
        const thisUserIdx = this.allUsers.findIndex((user) => user.id === id);

        this.allUsers[thisUserIdx] = { ...changedUser };
        this.searchedUsers[thisUserIdx] = { ...changedUser };

        this.allUsersChanged.emit({
          users: this.allUsers.slice(),
          searchedUsers: this.searchedUsers.slice(),
          changedUser,
          pageCount: this.pageCount,
          currentPage: this.currentPage,
          searchField: this.searchField,
        });
      });
  }

  fetchSearchedUsers(searchField: string, page: number) {
    this.searchField = searchField;
    this.http
      .get<{ _meta: any; result: User[] }>(
        `${this.baseURL}/users?first_name=${searchField}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .subscribe((responseData) => {
        this.mataGatosService.killCat(
          `${this.baseURL}/users?first_name=${searchField}&page=${page}`
        );

        this.selectedUserChanged.emit();
        this.pageCount = responseData._meta.pageCount;
        this.currentPage = page;
        if (page === 1) {
          this.searchedUsers = [...responseData.result];
        } else {
          this.searchedUsers = [...this.searchedUsers, ...responseData.result];
        }

        this.allUsersChanged.emit({
          users: this.searchedUsers.slice(),
          searchedUsers: this.searchedUsers.slice(),
          changedUser: null,
          pageCount: this.pageCount,
          currentPage: this.currentPage,
          searchField,
        });
      });
  }

  getSelectedUser(): User {
    return { ...this.selectedUser };
  }
}
