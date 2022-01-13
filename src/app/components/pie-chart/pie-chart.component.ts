import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Tokenomics } from 'src/app/interfaces/tokenomics';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() coinData: Array<any>;
  @Input() portfolio: Array<Tokenomics> = [];

  chartTitle = "Portfolio Composition"

  typePie = "PieChart";

  width = 550;
  height = 400;

  btcTotalValue: number = 0.0;

  data = [
  ];

  constructor() {

    if(this.coinData !== undefined) {
      let btcEntry = this.coinData.find( elem => elem.symbol === "btc");
      let btcVal: number = (btcEntry.current_price as number);
      console.log(`BTC current price ${btcVal}`);
    }

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {

    console.log("Running onChangej");
    console.log(changes.portfolio);
    console.log(`Portfolio size: ${this.portfolio.length}`);
    if(this.coinData !== undefined) {

      if(this.portfolio.length > 0) {
        let btcEntry = this.coinData.find( elem => elem.symbol === "btc");
        let btcVal: number = 1.0;
        if(btcEntry !== undefined) {
          btcVal = (btcEntry.current_price as number);
          console.log(`BTC current price ${btcVal}`);
        }

        this.data = [];
        this.btcTotalValue = 0.0;
        for (let token of this.portfolio) {
          console.log(`Adding ${token.name} to chart.`);
          let coin = this.coinData[token.idx];
          token.btcValue = token.price / btcVal;
          let tokenInBTC = token.btcValue * token.amount;
          this.btcTotalValue = this.btcTotalValue + tokenInBTC;
          this.data.push([token.name, tokenInBTC]);
        }
      } else {
        console.log(`Portfolio empty`);
      }

    }

  }

}
