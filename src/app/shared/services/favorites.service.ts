import { Injectable, EventEmitter } from '@angular/core';

import { User } from '../user.model';

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

  removeUser(userId: string) {
    const thisUserIdx = this.favorites.findIndex((user) => user.id === userId);

    this.favorites.splice(thisUserIdx, 1);
    this.favoritesChanged.emit(this.favorites.slice());
  }

  isCurrentUserAFavorite(userId): boolean {
    return this.favorites.map((user: User) => user.id).includes(userId);
  }

  toggleModal() {
    this.isModalDisplayed = !this.isModalDisplayed;
    this.modalDisplayChanged.emit(this.isModalDisplayed);
  }

  getFavorites(): User[] {
    return this.favorites.slice();
  }
}
