import { AppResolver } from './app.resolver';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AppResolver', () => {
  let route: ActivatedRoute;
  let resolver: AppResolver;

  const params = {};
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
    it('should return true', fakeAsync(() => {
      resolver.resolve({params} as ActivatedRouteSnapshot)
        .subscribe(
          resp => expect(resp).toBe(true)
        )
    }));
});
