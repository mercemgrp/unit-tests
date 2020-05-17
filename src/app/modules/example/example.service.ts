import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';

@Injectable()
export class ExampleService {
  data: Item[];
  constructor(private http: HttpClient) { }

  getData(): Observable<Item[]> {
    return this.data ? of(this.data) : this.getDataFromService();
  }

  pushData(item: Item) {
    this.data.push(item);
    this.data.map(i => {
      i.description = `${i.id} - ${i.title}`;
      return i;
    });
    return of(this.data);

  }
  getNextId() {
    return this.data[this.data.length - 1].id + 1;
  }

  private getDataFromService(): Observable<Item[]> {
    return this.http.get<Item[]>
      ('./assets/data/example.json').pipe(
        map(resp => {
          this.data = resp;
          return resp.map(item => {
            item.description = `${item.id} - ${item.title}`;
            return item;
          });
        }
        )
      );
  }
}
