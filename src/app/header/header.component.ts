import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  NavigationEnd,
  Event as NavigationEvent,
} from '@angular/router';
import { Subscription } from 'rxjs';

import { FavoritesService } from './favorites.service';
import { MataGatosService } from './mataGatos.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  favoritesCount: number = 0;
  catsKilled: number = 0;
  showModal: boolean = false;

  links: string[] = ['owners', 'home', 'search'];

  routerSub: Subscription;
  favoritesChangeSub: Subscription;
  favoritesModalSub: Subscription;
  mataGatosSub: Subscription;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService,
    private mataGatosService: MataGatosService
  ) {}

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        event.url = event.url.slice(1);
        if (!this.links.includes(event.url)) event.url = 'home';

        const tempLinks = [...this.links];
        const currentLinkIdx = tempLinks.findIndex((ele) => ele === event.url);
        const currentLink = tempLinks.splice(currentLinkIdx, 1);

        tempLinks.splice(1, 0, currentLink[0]);
        this.links = [...tempLinks];
      }
    });

    this.favoritesChangeSub = this.favoritesService.favoritesChanged.subscribe(
      (users: User[]) => {
        this.favoritesCount = users.length;
      }
    );

    this.favoritesModalSub = this.favoritesService.modalDisplayChanged.subscribe(
      (isModalDisplayed: boolean) => {
        this.showModal = isModalDisplayed;
      }
    );

    this.mataGatosSub = this.mataGatosService.anotherCatKilled.subscribe(
      (numKilled: number) => {
        this.catsKilled = numKilled;
      }
    );
  }

  onShowModal() {
    this.favoritesService.toggleModal();
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.favoritesChangeSub.unsubscribe();
    this.favoritesModalSub.unsubscribe();
    this.mataGatosSub.unsubscribe();
  }
}
