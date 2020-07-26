import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UsersService } from '../../users.service';
import { FavoritesService } from '../../header/favorites.service';
import { User } from '../user.model';
import { dobConverter } from '../../../helpers/dobConverter';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  displayedUser: User | null;
  renderedDetails: [][];
  favoriteUsers: User[] = [];
  isDisabled: boolean = false;
  isLoading: boolean = false;
  userPhoto: string;

  userChangedSub: Subscription;
  userPhotoFetched: Subscription;
  allusersChanged: Subscription;
  favoritesChanged: Subscription;

  constructor(
    private usersService: UsersService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.userChangedSub = this.usersService.selectedUserChanged.subscribe(
      (currentlySelected: User) => {
        if (currentlySelected) {
          this.isLoading = true;
          this.usersService.fetchSingleUser(currentlySelected.id);
          this.userPhoto = currentlySelected._links.avatar.href;
          // this.usersService.fetchUserPhoto(currentlySelected.id);
        } else {
          this.displayedUser = null;
        }
      }
    );

    // this.userPhotoFetched = this.usersService.userPhotoFetched.subscribe(
    //   (photo: string) => {
    //     this.userPhoto = photo;
    //   }
    // );

    this.allusersChanged = this.usersService.allUsersChanged.subscribe(
      (changed: { users: User[]; changedUser: User | null }) => {
        if (changed.changedUser !== null) {
          this.displayedUser = changed.changedUser;
          this.isDisabled = this.favoritesService.isCurrentUserAFavorite(
            this.displayedUser.id
          );

          const tempDetails = [];
          for (let key in this.displayedUser) {
            if (key === 'dob') {
              tempDetails.push([[key], dobConverter(this.displayedUser[key])]);
            } else if (key !== 'id' && key !== '_links') {
              tempDetails.push([[key], this.displayedUser[key]]);
            }
          }
          this.renderedDetails = [...tempDetails];
          this.isLoading = false;
        }
      }
    );

    this.favoritesChanged = this.favoritesService.favoritesChanged.subscribe(
      (favorites: User[]) => {
        this.favoriteUsers = [...favorites];
        this.isDisabled = this.favoritesService.isCurrentUserAFavorite(
          this.displayedUser.id
        );
      }
    );
  }

  onAddFavorites() {
    this.favoritesService.addFavorite(this.displayedUser);
  }

  ngOnDestroy() {
    this.userChangedSub.unsubscribe();
    this.userPhotoFetched.unsubscribe();
    this.allusersChanged.unsubscribe();
    this.favoritesChanged.unsubscribe();
  }
}
