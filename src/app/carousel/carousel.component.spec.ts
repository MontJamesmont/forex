import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { from, Observable } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';
import { CarouselComponent } from './carousel.component';
import { ApiService } from '../services/api.service';

describe('CarouselComponent', () => {
  let component: CarouselComponent,
    apiService: ApiService,
    fixture: ComponentFixture<CarouselComponent>;

  const dataGbp = {
    base: 'EUR',
    date: '2018-10-25',
    rates: { GBP: 0.885077, EUR: 1 },
    success: true,
    timestamp: 1540469646
  },
    dataChf = {
      base: 'EUR',
      date: '2018-10-25',
      rates: { CHF: 1.140729, USD: 1.141585 },
      success: true,
      timestamp: 1540469646
    },
    dataUsd = {
      base: 'EUR',
      date: '2018-10-25',
      rates: { USD: 1.141585, GBP: 0.885077 },
      success: true,
      timestamp: 1540469646
    };

  class ApiServiceMock {
    getLatest(symbols: string[]): Observable<any> {
      if (symbols[0] === 'GBP') return from([dataGbp]);
      else if (symbols[0] === 'CHF') return from([dataChf]);
      else if (symbols[0] === 'USD') return from([dataUsd]);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      imports: [
        RouterTestingModule,
        NgbModule,
        MomentModule
      ],
      providers: [
        { provide: ApiService, useClass: ApiServiceMock }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    apiService = fixture.debugElement.injector.get(ApiService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call method 'getLatest' from apiService after OnInit`, () => {
    const spy = spyOn(apiService, 'getLatest').and.callThrough();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it(`should call method 'getLatest' from apiService after call 'refreshValue' with {current: "1"}`, () => {
    const spy = spyOn(apiService, 'getLatest').and.callThrough();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      component.refreshValue({ current: '1' });
      expect(spy).toHaveBeenCalled();
    });
  });

  it(`should have exchangeValue 1.2898 after call 'refreshValue' with {current: "1"}`, () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      component.refreshValue({ current: '1' });
      expect(component.exchangeValue).toBe(0.9993);
    });
  });
});
