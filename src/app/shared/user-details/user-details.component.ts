import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../users.service';
import { FavoritesService } from '../../header/favorites.service';
import { User } from '../user.model';
import { dobConverter } from '../../../helpers/dobConverter';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  displayedUser: User;
  renderedDetails: string[];
  favoriteUsers: User[] = [];
  isDisabled: boolean = false;
  isLoading: boolean = false;

  constructor(
    private usersService: UsersService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.usersService.selectedUserChanged.subscribe(
      (currentlySelected: User) => {
        this.isLoading = true;
        this.usersService.fetchSingleUser(currentlySelected.id);
      }
    );

    this.usersService.allUsersChanged.subscribe(
      (changed: { users: User[]; changedUser: User | null }) => {
        if (changed.changedUser !== null) {
          this.displayedUser = changed.changedUser;
          this.isDisabled = this.favoritesService.isCurrentUserAFavorite(
            this.displayedUser.id
          );

          const tempDetails = [];
          for (let key in this.displayedUser) {
            if (key === 'dob') {
              tempDetails.push(dobConverter(this.displayedUser[key]));
            } else if (key !== 'id' && key !== '_links') {
              tempDetails.push(this.displayedUser[key]);
            }
          }
          this.renderedDetails = [...tempDetails];
          this.isLoading = false;
        }
      }
    );

    this.favoritesService.favoritesChanged.subscribe((favorites: User[]) => {
      this.favoriteUsers = [...favorites];
      this.isDisabled = this.favoritesService.isCurrentUserAFavorite(
        this.displayedUser.id
      );
    });
  }

  onAddFavorites() {
    this.favoritesService.addFavorite(this.displayedUser);
  }
}
