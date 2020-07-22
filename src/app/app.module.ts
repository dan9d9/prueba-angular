import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DuenosComponent } from './duenos/duenos.component';
import { HeaderComponent } from './header/header.component';
import { UserContainerComponent } from './shared/user-container/user-container.component';
import { UserListComponent } from './shared/user-container/user-list/user-list.component';
import { UserDetailsComponent } from './shared/user-container/user-details/user-details.component';
import { UserItemComponent } from './shared/user-container/user-list/user-item/user-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BusquedaComponent,
    DuenosComponent,
    HeaderComponent,
    UserContainerComponent,
    UserListComponent,
    UserDetailsComponent,
    UserItemComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
