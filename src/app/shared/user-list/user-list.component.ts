import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UsersService } from '../../users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  currentPage: number = 1;
  totalPages: number;
  isFetching: boolean = false;
  searchField: string;

  allChangedSub: Subscription;
  searchChangedSub: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.usersService.fetchUsers(this.currentPage);

    this.allChangedSub = this.usersService.allUsersChanged.subscribe(
      (changed: {
        users: User[];
        changedUser: User | null;
        pageCount: number | null;
        currentPage: number | null;
      }) => {
        if (changed.pageCount) {
          this.totalPages = changed.pageCount;
        }

        this.currentPage = changed.currentPage;
        this.users = changed.users;
        this.isFetching = false;
        this.searchField = '';
      }
    );

    this.searchChangedSub = this.usersService.searchedUsersChanged.subscribe(
      (results: {
        users: User[];
        pageCount: number;
        currentPage: number;
        searchField: string;
      }) => {
        this.currentPage = results.currentPage;
        this.totalPages = results.pageCount;
        this.users = [...results.users];
        this.searchField = results.searchField;
      }
    );
  }

  onLoadMore() {
    this.currentPage++;
    if (this.searchField) {
      this.usersService.fetchSearchedUsers(this.searchField, this.currentPage);
    } else {
      this.usersService.fetchUsers(this.currentPage);
    }
  }

  ngOnDestroy() {
    this.allChangedSub.unsubscribe();
    this.searchChangedSub.unsubscribe();
  }
}
