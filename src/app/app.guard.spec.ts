import { TestBed } from '@angular/core/testing';
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
  it('should return true when resolve', (() => {
    expect(guard).toBeTruthy();
  }));
});
