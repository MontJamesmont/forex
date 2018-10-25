import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {
  exchangeValue: number;
  exchangeTime: Date;
  exchangePairs: { name: string, symbols: string[], src: string }[];

  constructor(
    private apiService: ApiService
  ) {

    this.exchangePairs = [
      { name: 'gbp-eur', symbols: ['GBP', 'EUR'], src: '../../assets/carousel/england.jpg' },
      { name: 'chf-usd', symbols: ['CHF', 'USD'], src: '../../assets/carousel/Szwajcaria.jpg' },
      { name: 'usd-gbp', symbols: ['USD', 'GBP'], src: '../../assets/carousel/USA.jpg' }
    ];
  }

  ngOnInit(): void {
    this.getExchangeValue(this.exchangePairs[0].symbols);
  }

  private getExchangeValue(symbols: string[]): void {
    this.apiService.getLatest(symbols).subscribe((data) => {
      this.exchangeValue = Math.round((data.rates[symbols[0]] / data.rates[symbols[1]]) * 10000) / 10000;
      this.exchangeTime = new Date(data.timestamp * 1000);
    });
  }

  refreshValue($event) {
    const currentPair = this.exchangePairs[$event.current[$event.current.length - 1]];
    this.getExchangeValue(currentPair.symbols);
  }
}
