import { Component, OnInit, Input } from '@angular/core';

import { User } from './user.model';
import { UsersService } from '../../../users.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  @Input() currentUser: User;
  isActive: boolean = false;

  constructor(private usersServices: UsersService) {}

  ngOnInit(): void {
    this.usersServices.currentUserChanged.subscribe(() => {
      this.isActive = false;
    });

    if (this.currentUser && this.user.id === this.currentUser.id) {
      this.isActive = true;
    }
  }

  onUserClick(userId) {
    this.usersServices.fetchSingleUser(userId);
  }
}
