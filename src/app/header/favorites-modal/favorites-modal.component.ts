import { Component, OnInit } from '@angular/core';

import { FavoritesService } from '../../shared/services/favorites.service';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-favorites-modal',
  templateUrl: './favorites-modal.component.html',
  styleUrls: ['./favorites-modal.component.css'],
})
export class FavoritesModalComponent implements OnInit {
  numberFavorites: number = 0;
  favoriteUsers: User[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favoriteUsers = this.favoritesService.getFavorites();

    this.favoritesService.favoritesChanged.subscribe(
      (favoriteUsers: User[]) => {
        this.favoriteUsers = favoriteUsers;
      }
    );
  }

  onCloseModal() {
    this.favoritesService.toggleModal();
  }
}
