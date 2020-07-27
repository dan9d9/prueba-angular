import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DuenosComponent } from './duenos/duenos.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './shared/user-list/user-list.component';
import { UserDetailsComponent } from './shared/user-details/user-details.component';
import { UserItemComponent } from './shared/user-item/user-item.component';
import { SearchComponent } from './busqueda/search/search.component';
import { FavoritesModalComponent } from './header/favorites-modal/favorites-modal.component';
import { ContentWrapperComponent } from './shared/content-wrapper/content-wrapper.component';

const appRoutes: Routes = [
  { path: 'owners', component: DuenosComponent },
  { path: 'search', component: BusquedaComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
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
    SearchComponent,
    FavoritesModalComponent,
    ContentWrapperComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
