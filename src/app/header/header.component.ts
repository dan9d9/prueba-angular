import { Component, OnInit } from '@angular/core';

import { FavoritesService } from './favorites.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  favoritesCount: number;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favoritesService.favoritesChanged.subscribe((users: User[]) => {
      this.favoritesCount = users.length;
    });
  }
}
