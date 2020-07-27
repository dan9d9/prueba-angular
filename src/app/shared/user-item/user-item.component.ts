import { Component, OnInit, Input } from '@angular/core';

import { User } from '../user.model';
import { UsersService } from '../../users.service';
import { FavoritesService } from '../../header/favorites.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  @Input() isFavoriteUser: boolean;

  isActive: boolean = false;

  constructor(
    private usersServices: UsersService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.usersServices.selectedUserChanged.subscribe(() => {
      this.isActive = false;
    });

    const selectedUser = this.usersServices.getSelectedUser();

    if (selectedUser?.id === this.user.id) {
      this.isActive = true;
    }
  }

  onUserClick() {
    if (this.isFavoriteUser) return;
    this.usersServices.changeSelectedUser(this.user);
    this.isActive = true;
  }

  onRemoveFavorite() {
    this.favoritesService.removeUser(this.user.id);
  }
}
