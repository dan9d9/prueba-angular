import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MataGatosService {
  anotherCatKilled = new EventEmitter<string[]>();

  private requestsLog: string[] = [];

  killCat(request: string) {
    this.requestsLog.push(request);
    this.anotherCatKilled.emit(this.requestsLog.slice());
  }

  constructor() {}
}
