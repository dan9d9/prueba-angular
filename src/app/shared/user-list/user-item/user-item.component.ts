import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from './user.model';
import { UsersService } from '../../../users.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit {
  @Input() user: User;

  constructor(private usersServices: UsersService) {}

  onUserClick(id) {
    this.usersServices.fetchSingleUser(id);
  }

  ngOnInit(): void {}
}
