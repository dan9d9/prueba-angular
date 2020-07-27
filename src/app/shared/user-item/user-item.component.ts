import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { User } from '../user.model';
import { UsersService } from '../services/users.service';
import { FavoritesService } from '../services/favorites.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Input() isFavoriteUser: boolean;

  isActive: boolean = false;
  userPhoto: string;

  userChangedSub: Subscription;

  constructor(
    private usersServices: UsersService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.userChangedSub = this.usersServices.selectedUserChanged.subscribe(
      () => {
        this.isActive = false;
      }
    );

    const selectedUser = this.usersServices.getSelectedUser();

    if (selectedUser?.id === this.user.id) {
      this.isActive = true;
    }

    if (this.isFavoriteUser) {
      this.userPhoto = this.user._links.avatar.href;
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

  ngOnDestroy() {
    this.userChangedSub.unsubscribe();
  }
}
