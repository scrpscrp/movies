import { MoviesService } from './movies.service';
import { TestBed } from '@angular/core/testing';


describe('ServicesService', () => {
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
