import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../users.service';
import { User } from '../user-list/user-item/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  currentUser: User;
  userDetails: string[];

  constructor(private usersService: UsersService) {
    this.usersService.currentUserChanged.subscribe((user: User) => {
      this.currentUser = user;
      const tempDetails = [];
      for (let key in this.currentUser) {
        if (key !== 'id' && key !== '_links') {
          tempDetails.push(this.currentUser[key]);
        }
      }
      console.log('temp details: ', tempDetails);
      this.userDetails = [...tempDetails];
    });
  }

  ngOnInit(): void {}
}
