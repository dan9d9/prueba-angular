import { Component, OnInit, OnDestroy } from '@angular/core';

import { UsersService } from '../../users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchField: string;

  timeout;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  onSearch() {
    clearTimeout(this.timeout);
    this.usersService.fetchSearchedUsers(this.searchField, 1);
  }

  onSearchDebounce() {
    if (this.searchField.length < 2) return;

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.usersService.fetchSearchedUsers(this.searchField, 1);
    }, 1000);
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }
}
