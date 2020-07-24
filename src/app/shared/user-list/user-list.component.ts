import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../users.service';
import { User } from './user-item/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[];
  currentPage: number = 1;
  isFetching: boolean = false;
  isLoadingMore: boolean = false;

  currentUser: User;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.usersService.fetchUsers(this.currentPage);
    this.usersService.allUsersChanged.subscribe((users: User[]) => {
      this.users = users;
      this.isFetching = false;
    });

    this.usersService.currentUserChanged.subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  onLoadMore() {
    this.isLoadingMore = true;
    this.currentPage++;
    this.usersService.fetchUsers(this.currentPage);
    this.isLoadingMore = false;
  }
}
