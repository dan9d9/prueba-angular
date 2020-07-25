import { Component, OnInit } from '@angular/core';

import { FavoritesService } from './favorites.service';
import { MataGatosService } from './mataGatos.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  favoritesCount: number;
  catsKilled: number = 0;

  constructor(
    private favoritesService: FavoritesService,
    private mataGatosService: MataGatosService
  ) {}

  ngOnInit(): void {
    this.favoritesService.favoritesChanged.subscribe((users: User[]) => {
      this.favoritesCount = users.length;
    });

    this.mataGatosService.anotherCatKilled.subscribe((numKilled: number) => {
      this.catsKilled = numKilled;
    });
  }
}
