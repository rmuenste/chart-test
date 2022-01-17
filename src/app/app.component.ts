import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CryptoService } from './crypto.service';
import { PortfolioEntry } from './interfaces/portfolio-entry';
import { Tokenomics } from './interfaces/tokenomics';


interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  countries = COUNTRIES;

  title = 'chart-test';

  streamData: any[] = [];

  tableData: Array<Tokenomics> = [];

  subscription: Subscription;

  portfolioSubscription: Subscription;

  tokenSymbol = "";
  tokenAmount : number = 0.0;

  cryptoPortfolio: Array<Tokenomics> = [];

  name = '';

  addPortfolioEntrySimple(name: string, amount: number): void {

    let lowerSymbol = name.toLowerCase();
    let userSymbolIdx: number = this.streamData.findIndex( elem => elem.symbol.toLowerCase() === lowerSymbol);
    if(userSymbolIdx !== -1) {
      let userSymbol = this.streamData[userSymbolIdx];

      let entry: Tokenomics ={
        name: userSymbol.symbol,
        flag: userSymbol.image,
        price: userSymbol.current_price,
        marketcap: userSymbol.market_cap,
        idx: userSymbolIdx,
        amount: amount,
        btcValue: 0.0
      }

      // Add it to the table
      this.tableData.push(entry);

      // Add it to the portfolio
      this.cryptoPortfolio.push(entry);
      this.cryptoPortfolio = this.cryptoPortfolio.slice();
    }

  }

  ngOnInit(): void {

    this.subscription = this.coinService.getData().subscribe(data => {
      this.streamData = JSON.parse(data);
      console.log(this.streamData.length);

    this.coinService.getPortfolio().subscribe(data => {
      let stream = JSON.parse(data);
      for (let s of stream) {
        this.addPortfolioEntrySimple(s.symbol as string, s.amount as number)
      }
    });

    });

  }

  constructor(private coinService: CryptoService) {

  }

  onSubmit(event?: MouseEvent) {
    if (this.tokenAmount === 0.0 || this.tokenSymbol === "")
    {
      alert(`Invalid amount: ${this.tokenAmount} or invalid symbol: ${this.tokenSymbol}`);
      return;
    }

    let lowerSymbol = this.tokenSymbol.toLowerCase();
    let userSymbolIdx: number = this.streamData.findIndex( elem => elem.symbol.toLowerCase() === lowerSymbol);

    if(userSymbolIdx === -1) {
      alert(`Symbol not found: ${this.tokenSymbol}`);
      return;
    }

    let userSymbol = this.streamData[userSymbolIdx];

    let entry: Tokenomics ={
      name: userSymbol.symbol,
      flag: userSymbol.image,
      price: userSymbol.current_price,
      marketcap: userSymbol.market_cap,
      idx: userSymbolIdx,
      amount: this.tokenAmount,
      btcValue: 0.0
    }

    // Add it to the table
    this.tableData.push(entry);

    // Add it to the portfolio
    this.cryptoPortfolio.push(entry);
    this.cryptoPortfolio = this.cryptoPortfolio.slice();

    alert(`Added ${this.tokenAmount} ${this.tokenSymbol}`);
    this.tokenSymbol = "";
    this.tokenAmount = 0.0;
    for (let x of this.cryptoPortfolio) {
      console.log(`New portfolio ${x.name}`);
    }
    if(event) event.stopPropagation();
  }

  onInputSymbol(event: Event) {
    console.log( (event.target as HTMLInputElement).value);
  }


}
