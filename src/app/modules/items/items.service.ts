import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';

@Injectable()
export class ItemsService {
  items: Item[];
  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.items ? of(this.items) : this.getDataFromService();
  }

  getItem(id: number): Observable<Item> {
    return this.getItems().pipe(
      map(resp => this.items.find(item => item.id === id)
      )
    );
  }

  pushItem(item: Item): Observable<Item[]> {
    if (!item) {
      return of(this.items);
    }
    this.items.push(item);
    this.items = this.transformData(this.items);
    return of(this.items);

  }
  modifyItem(item: Item): Observable<Item[]> {
    if (!item) {
      return of(this.items);
    }
    this.items = this.items.map(i => {
      if (i.id === item.id) {
        i.title = item.title;
      }
      return item;
    });
    this.items = this.transformData(this.items);
    return of(this.items);

  }
  getNextId() {
    return this.items &&
           Array.isArray(this.items) &&
           this.items.length > 0 ? this.items[this.items.length - 1].id + 1 : 1;
  }

  private getDataFromService(): Observable<Item[]> {
    return this.http.get<Item[]>
      ('./assets/data/example.json').pipe(
        map(
          resp => {
            this.items = this.transformData(resp);
            return this.items;
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
