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
  @Input() currentUser: User;
  @Input() isFavoriteUser: boolean;
  isActive: boolean = false;

  constructor(
    private usersServices: UsersService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.usersServices.currentUserChanged.subscribe(() => {
      this.isActive = false;
    });

    if (this.currentUser && this.user.id === this.currentUser.id) {
      this.isActive = true;
    }
  }

  onUserClick() {
    this.usersServices.fetchSingleUser(this.user.id);
  }

  onRemoveFavorite() {
    this.favoritesService.removeUser(this.user.id);
  }
}
