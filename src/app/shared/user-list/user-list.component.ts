import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UsersService } from '../services/users.service';
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

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.usersService.fetchUsers(this.currentPage);

    this.allChangedSub = this.usersService.allUsersChanged.subscribe(
      (changed: {
        users: User[];
        searchedUsers: User[];
        changedUser: User | null;
        pageCount: number;
        currentPage: number;
        searchField: string;
      }) => {
        this.totalPages = changed.pageCount;
        this.currentPage = changed.currentPage;
        this.isFetching = false;

        if (changed.searchField) {
          this.users = [...changed.searchedUsers];
          this.searchField = changed.searchField;
        } else {
          this.users = [...changed.users];
          this.searchField = '';
        }
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
  }
}
