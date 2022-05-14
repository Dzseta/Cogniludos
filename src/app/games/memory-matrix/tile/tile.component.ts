import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  template: `
    <div class="empty" *ngIf="value=='0'"></div>
    <div class="guessedRight" *ngIf="value=='1'"></div>
    <div class="guessedWrong" *ngIf="value=='2'"></div>
    <div class="emptyRight" *ngIf="value=='3'"></div>
    <div class="guessed" *ngIf="value=='4'"></div>
    <div class="notGuessed" *ngIf="value=='5'"></div>
  `,
  styles: [
    `
    div {
      width: 100%;
      height: 100%;
      margin: auto;
    }
    .empty {
      background-color: #593000;
    }
    .emptyRight {
      background-color: #593000;
    }
    .guessedRight {
      background-color: #ffc107;
    }
    .guessedWrong {
      background-color: #C20400;
    }
    .empty:hover, .emptyRight:hover {
      background-color: #6f3d03;
    }
    .guessed {
      background-color: #ffc107;
      box-shadow: 0 0 0 5px #009600 inset;
    }
    .notGuessed {
      background-color: #ffc107;
      box-shadow: 0 0 0 5px #C20400 inset;
    }
    `
  ]
})
export class TileComponent {

  @Input() value: '0' | '1' | '2' | '3' | '4' | '5' | undefined;

}
