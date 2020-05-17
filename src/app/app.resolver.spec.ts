import { AppResolver } from './app.resolver';
import { ActivatedRoute } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AppResolver', () => {
  let route: ActivatedRoute;
  let resolver: AppResolver;

  const params = {};

  describe('should return true', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          AppResolver,
          {
            provide: ActivatedRoute,
            useValue: { snapshot: { params } }
          }]
      });
      route = TestBed.get(ActivatedRoute);
      resolver = TestBed.get(AppResolver);
    });
    it('should be created', (() => {
      expect(resolver).toBeTruthy();
    }));
  });
});
