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
  favoritesCount: number = 0;
  catsKilled: number = 0;
  showModal: boolean = false;

  constructor(
    private favoritesService: FavoritesService,
    private mataGatosService: MataGatosService
  ) {}

  ngOnInit(): void {
    this.favoritesService.favoritesChanged.subscribe((users: User[]) => {
      this.favoritesCount = users.length;
    });
    this.favoritesService.modalDisplayChanged.subscribe(
      (isModalDisplayed: boolean) => {
        this.showModal = isModalDisplayed;
      }
    );

    this.mataGatosService.anotherCatKilled.subscribe((numKilled: number) => {
      this.catsKilled = numKilled;
    });
  }

  onShowModal() {
    this.favoritesService.toggleModal();
  }
}
