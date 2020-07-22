import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DuenosComponent } from './duenos/duenos.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './shared/user-list/user-list.component';
import { UserDetailsComponent } from './shared/user-details/user-details.component';
import { UserItemComponent } from './shared/user-list/user-item/user-item.component';
import { ViewMoreBtnComponent } from './shared/user-list/view-more-btn/view-more-btn.component';
import { AddFavoriteBtnComponent } from './shared/user-details/add-favorite-btn/add-favorite-btn.component';
import { SearchComponent } from './busqueda/search/search.component';
import { FavoritesModalComponent } from './header/favorites-modal/favorites-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BusquedaComponent,
    DuenosComponent,
    HeaderComponent,
    UserListComponent,
    UserDetailsComponent,
    UserItemComponent,
    ViewMoreBtnComponent,
    AddFavoriteBtnComponent,
    SearchComponent,
    FavoritesModalComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
