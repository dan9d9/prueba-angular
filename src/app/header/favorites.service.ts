import { Injectable, EventEmitter } from '@angular/core';

import { User } from '../shared/user.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  favoritesChanged = new EventEmitter<User[]>();
  modalDisplayChanged = new EventEmitter<boolean>();

  private favorites: User[] = [];
  private isModalDisplayed: boolean = false;

  addFavorite(user: User) {
    this.favorites.push(user);
    this.favoritesChanged.emit(this.favorites.slice());
  }

  isCurrentUserAFavorite(userId) {
    return this.favorites.map((user: User) => user.id).includes(userId);
  }

  toggleModal() {
    this.isModalDisplayed = !this.isModalDisplayed;
    this.modalDisplayChanged.emit(this.isModalDisplayed);
  }

  getFavorites() {
    return this.favorites.slice();
  }
}
