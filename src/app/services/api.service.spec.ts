import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it(`should have as endpoint '/api'`, () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service.endpoint).toBe('/api');
  });

  it(`should have as latest '/api/latest'`, () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service.latest).toBe('/api/latest');
  });
});
