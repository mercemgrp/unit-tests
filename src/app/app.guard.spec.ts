import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppGuard } from './app.guard';

describe('AppGuard', () => {
  let guard: AppGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AppGuard]
    });
    guard = TestBed.get(AppGuard);
  });

  it('should create', (() => {
    expect(guard).toBeTruthy();
  }));
  /**
   * canActive() es una promesa por lo que es asíncrona.
   * En este test comprobamos que cuando se resuelve, se retorna "true"
   *
   */

  it('should return true when resolve', fakeAsync(() => {
    const resolver = guard.canActivate();
    resolver.then(resp => {
      expect(resp).toBe(true);
    });
    tick();
  }));
});
