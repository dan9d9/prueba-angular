import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MataGatosService {
  anotherCatKilled = new EventEmitter<number>();

  private catsKilled: number = 0;

  killCat() {
    this.catsKilled++;
    this.anotherCatKilled.emit(this.catsKilled);
  }

  constructor() {}
}
