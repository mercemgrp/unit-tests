import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';

@Injectable()
export class ItemsService {
  data: Item[];
  constructor(private http: HttpClient) { }

  getData(): Observable<Item[]> {
    return this.data ? of(this.data) : this.getDataFromService();
  }

  pushData(item: Item): Observable<Item[]> {
    if (!item) {
      return of(this.data);
    }
    this.data.push(item);
    this.data = this.transformData(this.data);
    return of(this.data);

  }
  getNextId() {
    return this.data[this.data.length - 1].id + 1;
  }

  private getDataFromService(): Observable<Item[]> {
    return this.http.get<Item[]>
      ('./assets/data/example.json').pipe(
        map(
          resp => {
            this.data = this.transformData(resp);
            return this.data;
          },
          () => 'Ha ocurrido un error'
        )
      );
  }

  private transformData(data) {
    return data.map(item => {
      item.description = `${item.id} - ${item.title}`;
      return item;
    });
  }
}
