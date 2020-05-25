import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';

@Injectable()
export class ItemsService {
  items: Item[];
  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.items ? of(this.items) : this.getItemsFromService();
  }

  getItem(id: number): Observable<Item> {
    return this.getItems().pipe(
      map(resp => resp.find(item => item.id === id)
      )
    );
  }

  pushItem(item: Item): Observable<Item[]> {
    if (!item) {
      return throwError('error');
    }
    this.items.push(this.transformItem(item));
    return of(this.items);

  }
  modifyItem(item: Item): Observable<Item[]> {
    if (!item) {
      return throwError('error');
    }
    const itemTemp = this.transformItem(item);
    this.items.find(i => i.id === item.id);
    this.items = this.items.map(i => i.id === itemTemp.id ? itemTemp : i);
    return of(this.items);

  }
  getNextId() {
    return this.items &&
           Array.isArray(this.items) &&
           this.items.length > 0 ? this.items[this.items.length - 1].id + 1 : 1;
  }

  private getItemsFromService(): Observable<Item[]> {
    return this.http.get<Item[]>
      ('./assets/data/items.json').pipe(
        map(
          resp => {
            this.items = this.transformItems(resp);
            return this.items;
          },
          () => throwError('error')
        )
      );
  }

  private transformItems(data) {
    return data.map(item => this.transformItem(item));
  }

  private transformItem(item: Item) {
    item.description = `${item.id} - ${item.title}`;
    return item;
  }
}
