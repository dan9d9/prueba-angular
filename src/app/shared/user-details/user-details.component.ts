import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../users.service';
import { FavoritesService } from '../../header/favorites.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  currentUser: User;
  renderedDetails: string[];
  favoriteUsers: User[] = [];
  isDisabled: boolean = false;

  constructor(
    private usersService: UsersService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.usersService.currentUserChanged.subscribe((user: User) => {
      this.currentUser = user;
      this.isDisabled = this.favoritesService.isCurrentUserAFavorite(
        this.currentUser.id
      );

      const tempDetails = [];
      for (let key in this.currentUser) {
        if (key !== 'id' && key !== '_links') {
          tempDetails.push(this.currentUser[key]);
        }
      }
      this.renderedDetails = [...tempDetails];
    });

    this.favoritesService.favoritesChanged.subscribe((favorites: User[]) => {
      this.favoriteUsers = [...favorites];
      this.isDisabled = this.favoritesService.isCurrentUserAFavorite(
        this.currentUser.id
      );
    });
  }

  onAddFavorites() {
    this.favoritesService.addFavorite(this.currentUser);
  }
}
