import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FavoritesService } from '../../shared/services/favorites.service';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-favorites-modal',
  templateUrl: './favorites-modal.component.html',
  styleUrls: ['./favorites-modal.component.css'],
})
export class FavoritesModalComponent implements OnInit, OnDestroy {
  numberFavorites: number = 0;
  favoriteUsers: User[] = [];

  favoritesChangedSub: Subscription;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favoriteUsers = this.favoritesService.getFavorites();

    this.favoritesChangedSub = this.favoritesService.favoritesChanged.subscribe(
      (favoriteUsers: User[]) => {
        this.favoriteUsers = favoriteUsers;
      }
    );
  }

  onToggleFavoritesModal() {
    this.favoritesService.toggleModal();
  }

  ngOnDestroy() {
    this.favoritesChangedSub.unsubscribe();
  }
}
