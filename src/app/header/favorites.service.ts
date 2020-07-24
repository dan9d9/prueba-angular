import { Injectable, EventEmitter } from '@angular/core';

import { User } from '../shared/user.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  favoritesChanged = new EventEmitter<User[]>();

  private favorites: User[] = [];

  addFavorite(user: User) {
    this.favorites.push(user);
    this.favoritesChanged.emit(this.favorites.slice());
  }

  isCurrentUserAFavorite(userId) {
    return this.favorites.map((user: User) => user.id).includes(userId);
  }
}
