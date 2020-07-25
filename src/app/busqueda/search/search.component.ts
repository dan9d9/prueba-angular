import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchField: string;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  onSearch() {
    console.log(this.searchField);
    this.usersService.fetchSearchedUsers(this.searchField, 1);
  }
}
